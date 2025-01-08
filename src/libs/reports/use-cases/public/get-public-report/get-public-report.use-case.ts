import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportDomain } from '@libs/reports/domains/report.domain';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetPublicReportDTO } from './get-public-report.dto';

export class GetPublicReportUseCase extends BaseUseCase<
  GetPublicReportDTO,
  ReportPresenterDTO[]
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super(GetPublicReportUseCase.name);
  }

  async execute(
    dto: GetPublicReportDTO,
  ): Promise<BaseResult<ReportPresenterDTO[]>> {
    this.logStartExecution(dto);

    const { latitude, longitude } = dto;

    const reports = await this.reportService.getReports({
      lat: latitude ?? 0,
      lng: longitude ?? 0,
    });
    this.logEndExecution();

    return this.ok(
      this.mapper.mapArray(reports, ReportDomain, ReportPresenterDTO),
    );
  }
}
