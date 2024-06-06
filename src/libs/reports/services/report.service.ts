import * as GeoHash from 'ngeohash';
import { DataSource, Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReportDomain } from '../domains/report.domain';
import { ReportLikeEntity } from '../entities/report-like.entity';
import { ReportEntity } from '../entities/report.entity';
import { ReportError } from '../errors/report.error';
import { GEOHASH_SEARCH_PRECISSION } from '../report.constant';

export interface GetNearbyReportsFilter {
  geoHash: string;
  excludedReportId?: string;
  userId?: string;
  limit?: number;
}

export interface GetLatestReportsFilter {
  excludedReportIds?: string[];
  userId?: string;
  limit?: number;
  nextToken?: string;
}

@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
    @InjectRepository(ReportLikeEntity)
    private readonly reportLikeRepository: Repository<ReportLikeEntity>,
    private dataSource: DataSource,
  ) {}

  async getReportById(
    reportId: string,
    userId?: string,
  ): Promise<ReportDomain | null> {
    this.logger.log(`START: getReportById`);
    this.logger.log(`Getting report by id: ${reportId}`);
    const qb = await this.reportRepository.createQueryBuilder('report');
    qb.leftJoinAndSelect(
      'report.user',
      'user',
      'user.id = report.reported_by_id',
    );
    qb.where('report.id = :id', { id: reportId });

    if (userId) {
      qb.leftJoin('report.likes', 'like', 'like.userId = :userId', { userId });
      qb.addSelect(
        'CASE WHEN COUNT(like.report_id) > 0 THEN true ELSE false END',
        'isReacted',
      );
      qb.addGroupBy('report.id');
      qb.addGroupBy('user.id');
    }

    const report = await qb.getOne();
    this.logger.log(`query: ${qb.getQuery()}`);
    if (!report) throw new ReportError.ReportNotFound();

    this.logger.log(`END: getReportById`);
    return this.mapper.map(report, ReportEntity, ReportDomain);
  }

  async getLatestReports(
    filter: GetLatestReportsFilter,
  ): Promise<ReportDomain[]> {
    this.logger.log(`START: getLatestReports`);
    this.logger.log(
      `Getting latest reports with filter: ${JSON.stringify(filter)}`,
    );
    const { excludedReportIds, userId, limit, nextToken } = filter;

    const qb = await this.reportRepository.createQueryBuilder('report');
    qb.leftJoinAndSelect(
      'report.user',
      'user',
      'user.id = report.reported_by_id',
    );
    qb.orderBy('report.rowId', 'DESC');

    if (nextToken) {
      qb.andWhere('report.rowId < :nextToken', {
        nextToken: parseInt(nextToken),
      });
    }

    if (excludedReportIds?.length) {
      qb.andWhere('report.id != IN(:...excludedReportIds)', {
        excludedReportIds,
      });
    }

    if (userId) {
      qb.leftJoin('report.likes', 'like', 'like.userId = :userId', { userId });
      qb.addSelect(
        'CASE WHEN COUNT(like.report_id) > 0 THEN true ELSE false END',
        'isReacted',
      );
      qb.addGroupBy('report.id');
      qb.addGroupBy('user.id');
    }

    qb.limit(limit ?? 10);

    const reports = await qb.getMany();
    this.logger.log(`query: ${qb.getQuery()}`);

    this.logger.log(`END: getLatestReports`);
    return this.mapper.mapArray(reports, ReportEntity, ReportDomain);
  }

  async getNearbyReports(
    filter: GetNearbyReportsFilter,
  ): Promise<ReportDomain[]> {
    this.logger.log(`START: getNearbyReports`);

    const { geoHash, excludedReportId, userId, limit } = filter;
    const neighbors = GeoHash.neighbors(geoHash);
    const qb = await this.reportRepository.createQueryBuilder('report');
    qb.leftJoinAndSelect(
      'report.user',
      'user',
      'user.id = report.reported_by_id',
    );
    qb.where('substring(report.geoHash, 0, :precission) IN(:...geoHashes)', {
      precission: GEOHASH_SEARCH_PRECISSION + 1,
      geoHashes: [geoHash, ...neighbors],
    });
    if (excludedReportId) {
      qb.andWhere('report.id != :excludedReportId', { excludedReportId });
    }
    if (userId) {
      qb.leftJoin('report.likes', 'like', 'like.userId = :userId', { userId });
      qb.addSelect(
        'CASE WHEN COUNT(like.report_id) > 0 THEN true ELSE false END',
        'isReacted',
      );
      qb.addGroupBy('report.id');
      qb.addGroupBy('user.id');
    }

    qb.limit(limit ?? 10);

    const reports = await qb.getMany();
    this.logger.log(`query: ${qb.getQuery()}`);

    this.logger.log(`END: getNearbyReports`);
    return this.mapper.mapArray(reports, ReportEntity, ReportDomain);
  }

  async likeReport(reportId: string, userId: string): Promise<void> {
    this.logger.log(`START: likeReport`);
    this.logger.log(`Liking report with id: ${reportId} by user: ${userId}`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const exists = await queryRunner.manager
        .getRepository(ReportLikeEntity)
        .findOne({
          where: {
            reportId,
            userId,
          },
        });

      if (!exists) {
        await queryRunner.manager.getRepository(ReportLikeEntity).save({
          reportId,
          userId,
          deletedAt: null,
        });

        await queryRunner.manager.getRepository(ReportEntity).increment(
          {
            id: reportId,
          },
          'totalReaction',
          1,
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(`Error liking report: ${error}`);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    this.logger.log(`END: likeReport`);
  }

  async unlikeReport(reportId: string, userId: string): Promise<void> {
    this.logger.log(`START: unlikeReport`);
    this.logger.log(`Unliking report with id: ${reportId} by user: ${userId}`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const exists = await queryRunner.manager
        .getRepository(ReportLikeEntity)
        .findOne({
          where: {
            reportId,
            userId,
          },
        });
      if (exists) {
        await queryRunner.manager.getRepository(ReportLikeEntity).softDelete({
          reportId,
          userId,
        });
        await queryRunner.manager.getRepository(ReportEntity).decrement(
          {
            id: reportId,
          },
          'totalReaction',
          1,
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(`Error liking report: ${error}`);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    this.logger.log(`END: unlikeReport`);
  }

  async createReport(report: ReportDomain): Promise<ReportDomain> {
    this.logger.log(`START: createReport`);
    this.logger.log(`Creating report with data: ${JSON.stringify(report)}`);
    const savedReport = await this.reportRepository.save(
      this.mapper.map(report, ReportDomain, ReportEntity),
    );

    this.logger.log(`END: createReport`);
    return this.mapper.map(savedReport, ReportEntity, ReportDomain);
  }
}
