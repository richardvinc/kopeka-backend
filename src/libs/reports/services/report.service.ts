import * as GeoHash from 'ngeohash';
import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReportDomain } from '../domains/report.domain';
import { ReportLikeEntity } from '../entities/report-like.entity';
import { ReportEntity } from '../entities/report.entity';
import { ReportError } from '../errors/report.error';

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
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
    @InjectRepository(ReportLikeEntity)
    private readonly reportLikeRepository: Repository<ReportLikeEntity>,
  ) {}

  async getReportById(
    reportId: string,
    userId?: string,
  ): Promise<ReportDomain | null> {
    const qb = await this.reportRepository.createQueryBuilder('report');
    qb.where('report.id = :id', { id: reportId });

    if (userId) {
      qb.leftJoin('report.likes', 'like', 'like.userId = :userId', { userId });
      qb.addSelect(
        'CASE WHEN COUNT(like.report_id) > 0 THEN true ELSE false END',
        'isReacted',
      );
      qb.groupBy('report.id');
    }

    const report = await qb.getOne();
    if (!report) throw new ReportError.ReportNotFound();

    return this.mapper.map(report, ReportEntity, ReportDomain);
  }

  async getLatestReports(
    filter: GetLatestReportsFilter,
  ): Promise<ReportDomain[]> {
    const { excludedReportIds, userId, limit, nextToken } = filter;

    const qb = await this.reportRepository.createQueryBuilder('report');
    qb.orderBy('report.createdAt', 'DESC');

    if (nextToken) {
      qb.where('report.createdAt < :nextToken', { nextToken });
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
      qb.groupBy('report.id');
    }

    qb.limit(limit ?? 10);

    const reports = await qb.getMany();

    return this.mapper.mapArray(reports, ReportEntity, ReportDomain);
  }

  async getNearbyReports(
    filter: GetNearbyReportsFilter,
  ): Promise<ReportDomain[]> {
    const { geoHash, excludedReportId, userId, limit } = filter;
    const neighbors = GeoHash.neighbors(geoHash);
    const qb = await this.reportRepository.createQueryBuilder('report');
    qb.where('report.geoHash IN(:...geoHashes)', {
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
      qb.groupBy('report.id');
    }

    qb.limit(limit ?? 10);

    const reports = await qb.getMany();

    return this.mapper.mapArray(reports, ReportEntity, ReportDomain);
  }

  async likeReport(reportId: string, userId: string): Promise<void> {
    await this.reportLikeRepository.save({
      reportId,
      userId,
    });
  }

  async createReport(report: ReportDomain): Promise<ReportDomain> {
    const savedReport = await this.reportRepository.save(
      this.mapper.map(report, ReportDomain, ReportEntity),
    );

    return this.mapper.map(savedReport, ReportEntity, ReportDomain);
  }
}
