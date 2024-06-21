import { ReportError } from '@libs/reports/errors/report.error';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { DeleteReportDTO } from './delete-report.dto';

export class DeleteReportUseCase extends BaseUseCase<DeleteReportDTO, void> {
  constructor(
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super(DeleteReportUseCase.name);
  }

  async execute(dto: DeleteReportDTO): Promise<void> {
    const report = await this.reportService.getReportById(dto.reportId);
    if (!report) {
      throw new ReportError.ReportNotFound();
    }

    if (report.reportedById !== dto.userId) {
      throw new ReportError.CannotDeleteOthersReport();
    }

    await this.reportService.deleteReport(dto.reportId, dto.userId);
  }
}
