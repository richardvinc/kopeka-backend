import { ReportError } from '@libs/reports/errors/report.error';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { LikeReportDTO } from './like-report.dto';

export class LikeReportUseCase extends BaseUseCase<LikeReportDTO, void> {
  constructor(
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super();
  }

  async execute(dto: LikeReportDTO): Promise<void> {
    const { reportId, userId } = dto;
    const report = await this.reportService.getReportById(reportId, userId);
    if (!report) throw new ReportError.ReportNotFound();

    if (!report.isReacted)
      await this.reportService.likeReport(reportId, userId);
  }
}
