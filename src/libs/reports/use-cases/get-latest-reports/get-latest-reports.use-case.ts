import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportDomain } from '@libs/reports/domains/report.domain';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetLatestReportsDTO } from './get-latest-reports.dto';

export class GetLatestReportsUseCase extends BaseUseCase<
  GetLatestReportsDTO,
  ReportPresenterDTO[]
> {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private readonly reportService: ReportService,
  ) {
    super();
  }

  async execute(
    dto: GetLatestReportsDTO,
  ): Promise<BaseResult<ReportPresenterDTO[]>> {
    const { userId, nextToken, excludedReportIds } = dto;
    const reports = await this.reportService.getLatestReports({
      userId,
      nextToken,
      excludedReportIds,
      limit: 3,
    });

    return this.ok(
      this.mapper.mapArray(reports, ReportDomain, ReportPresenterDTO),
    );
  }
}
