import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportDomain } from '@libs/reports/domains/report.domain';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { NEARBY_REPORT_LIMIT } from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';

import { GetNearbyReportDTO } from './get-nearby-report.dto';

export class GetNearbyReportUseCase extends BaseUseCase<
  GetNearbyReportDTO,
  ReportPresenterDTO[]
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    private reportService: ReportService,
  ) {
    super();
  }

  async execute(dto: GetNearbyReportDTO): Promise<ReportPresenterDTO[]> {
    const { geoHash, reportId, userId } = dto;

    const reports = await this.reportService.getNearbyReports({
      geoHash,
      excludedReportId: reportId,
      userId,
      limit: NEARBY_REPORT_LIMIT,
    });

    return this.mapper.mapArray(reports, ReportDomain, ReportPresenterDTO);
  }
}
