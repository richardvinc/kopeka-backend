import { ReportError } from '@libs/reports/errors/report.error';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { UnlikeReportDTO } from './unlike-report.dto';

export class UnlikeReportUseCase extends BaseUseCase<UnlikeReportDTO, void> {
  constructor(
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super(UnlikeReportUseCase.name);
  }

  async execute(dto: UnlikeReportDTO): Promise<void> {
    this.logStartExecution(dto);

    const { reportId, userId } = dto;
    const report = await this.reportService.getReportById(reportId, userId);
    if (!report) throw new ReportError.ReportNotFound();

    if (report.isReacted === true)
      await this.reportService.unlikeReport(reportId, userId);

    this.logEndExecution();
  }
}
