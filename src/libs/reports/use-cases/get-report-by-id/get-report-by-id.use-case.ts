import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportDomain } from '@libs/reports/domains/report.domain';
import { ReportError } from '@libs/reports/errors/report.error';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetReportByIdDTO } from './get-report-by-id.dto';

export class GetReportByIdUseCase extends BaseUseCase<
  GetReportByIdDTO,
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

  async execute(
    dto: GetReportByIdDTO,
  ): Promise<BaseResult<ReportPresenterDTO>> {
    const report = await this.reportService.getReportById(
      dto.reportId,
      dto.userId,
    );
    if (!report) throw new ReportError.ReportNotFound();

    return new BaseResult(
      this.mapper.map(report, ReportDomain, ReportPresenterDTO),
    );
  }
}
