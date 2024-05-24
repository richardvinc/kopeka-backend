import * as GeoHash from 'ngeohash';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { ReportDomain } from '../../domains/report.domain';
import { ReportPresenterDTO } from '../../presenters/report.presenter';
import { GEOHASH_PRECISSION, REPORT_SERVICE } from '../../report.constant';
import { CreateReportDTO } from './create-report.dto';

export class CreateReportUseCase extends BaseUseCase<
  CreateReportDTO,
  ReportPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super();
  }

  async execute(dto: CreateReportDTO): Promise<BaseResult<ReportPresenterDTO>> {
    const geoHash: string = GeoHash.encode(
      dto.lat,
      dto.lon,
      GEOHASH_PRECISSION,
    );

    const report = ReportDomain.create({
      ...dto,
      totalReaction: 0,
      location: {
        lat: dto.lat,
        lon: dto.lon,
        geoHash,
      },
    });

    const createdReport = await this.reportService.createReport(report);

    return this.ok(
      this.mapper.map(createdReport, ReportDomain, ReportPresenterDTO),
    );
  }
}
