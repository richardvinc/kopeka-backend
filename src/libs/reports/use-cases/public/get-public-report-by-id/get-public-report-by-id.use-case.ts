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

import { GetPublicReportByIdDTO } from './get-public-report-by-id.dto';

export class GetPublicReportByIdReportUseCase extends BaseUseCase<
  GetPublicReportByIdDTO,
  ReportPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super(GetPublicReportByIdReportUseCase.name);
  }

  async execute(
    dto: GetPublicReportByIdDTO,
  ): Promise<BaseResult<ReportPresenterDTO>> {
    this.logStartExecution(dto);

    const { reportId } = dto;

    const report = await this.reportService.getReportById(reportId);
    if (!report) throw new ReportError.ReportNotFound();
    this.logEndExecution();

    return this.ok(this.mapper.map(report, ReportDomain, ReportPresenterDTO));
  }
}
