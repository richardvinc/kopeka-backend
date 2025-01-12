import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportCountEntity } from '@libs/reports/entities/report-count.entity';
import { ReportCountPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

export class GetPublicReportCountUseCase extends BaseUseCase<
  null,
  ReportCountPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super(GetPublicReportCountUseCase.name);
  }

  async execute(): Promise<BaseResult<ReportCountPresenterDTO>> {
    this.logStartExecution();

    const reportCount = await this.reportService.getReportCount();
    this.logEndExecution();

    return this.ok(
      this.mapper.map(reportCount, ReportCountEntity, ReportCountPresenterDTO),
    );
  }
}
