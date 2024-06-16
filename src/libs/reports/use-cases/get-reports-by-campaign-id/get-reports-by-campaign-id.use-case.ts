import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportDomain } from '@libs/reports/domains/report.domain';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { REPORT_SERVICE } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetReportsByCampaignIdDTO } from './get-reports-by-campaign-id.dto';

export class GetReportsByCampaignIdUseCase extends BaseUseCase<
  GetReportsByCampaignIdDTO,
  ReportPresenterDTO[]
> {
  constructor(
    @Inject(REPORT_SERVICE)
    private readonly reportService: ReportService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    super(GetReportsByCampaignIdUseCase.name);
  }

  async execute(
    dto: GetReportsByCampaignIdDTO,
  ): Promise<BaseResult<ReportPresenterDTO[]>> {
    const reports = await this.reportService.getReportByCampaignId(
      dto.campaignId,
      dto.userId,
    );

    return this.ok(
      this.mapper.mapArray(reports, ReportDomain, ReportPresenterDTO),
    );
  }
}
