import * as GeoHash from 'ngeohash';
import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportEntity } from '@libs/reports/entities/report.entity';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { InjectRepository } from '@nestjs/typeorm';

import { GetNearbyReportDTO } from './get-nearby-report.dto';

export class GetNearbyReportUseCase extends BaseUseCase<
  GetNearbyReportDTO,
  ReportPresenterDTO[]
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) {
    super();
  }

  async execute(dto: GetNearbyReportDTO): Promise<ReportPresenterDTO[]> {
    const { geoHash, reportId } = dto;
    const neighbors = GeoHash.neighbors(geoHash);

    const qb = await this.reportRepository
      .createQueryBuilder('report')
      .where('report.geoHash IN(:...geoHashes)', {
        geoHashes: [geoHash, ...neighbors],
      });

    if (reportId) {
      qb.andWhere('report.id != :reportId', { reportId: reportId });
    }
    qb.limit(5);

    const reports = await qb.getMany();

    return this.mapper.mapArray(reports, ReportEntity, ReportPresenterDTO);
  }
}
