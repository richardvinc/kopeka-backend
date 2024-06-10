import * as GeoHash from 'ngeohash';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject, Logger } from '@nestjs/common';

import { ReportDomain } from '../../domains/report.domain';
import { ReportPresenterDTO } from '../../presenters/report.presenter';
import { GEOHASH_PRECISSION, REPORT_SERVICE } from '../../report.constant';
import { CreateReportDTO } from './create-report.dto';

export class CreateReportUseCase extends BaseUseCase<
  CreateReportDTO,
  ReportPresenterDTO
> {
  private readonly logger = new Logger(CreateReportUseCase.name);
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super();
  }

  async execute(dto: CreateReportDTO): Promise<BaseResult<ReportPresenterDTO>> {
    this.logger.log(`START: execute`);
    this.logger.log(`dto: ${JSON.stringify(dto)}`);

    const geoHash: string = GeoHash.encode(
      dto.latitude,
      dto.longitude,
      GEOHASH_PRECISSION,
    );

    const report = ReportDomain.create({
      ...dto,
      totalReaction: 0,
      location: {
        latitude: dto.latitude,
        longitude: dto.longitude,
        geoHash,
      },
    });

    const createdReport = await this.reportService.createReport(report);

    this.logger.log(`END: execute`);
    return this.ok(
      this.mapper.map(createdReport, ReportDomain, ReportPresenterDTO),
    );
  }
}
