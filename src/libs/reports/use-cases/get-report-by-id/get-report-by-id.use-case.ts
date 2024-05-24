import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportDomain } from '@libs/reports/domains/report.domain';
import { ReportError } from '@libs/reports/errors/report.error';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';

import { GetReportByIdDTO } from './get-report-by-id.dto';

export class GetReportByIdUseCase extends BaseUseCase<
  GetReportByIdDTO,
  ReportPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    private reportService: ReportService,
  ) {
    super();
  }

  async execute(dto: GetReportByIdDTO): Promise<ReportPresenterDTO> {
    const report = await this.reportService.getReportById(
      dto.reportId,
      dto.userId,
    );
    if (!report) throw new ReportError.ReportNotFound();

    return this.mapper.map(report, ReportDomain, ReportPresenterDTO);
  }
}
