import * as GeoHash from 'ngeohash';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportDomain } from '@libs/reports/domains/report.domain';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import {
  GEOHASH_PRECISSION,
  GEOHASH_SEARCH_PRECISSION,
  NEARBY_REPORT_LIMIT,
  REPORT_SERVICE,
} from '@libs/reports/report.constant';
import { ReportService } from '@libs/reports/services/report.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetNearbyReportDTO } from './get-nearby-report.dto';

export class GetNearbyReportUseCase extends BaseUseCase<
  GetNearbyReportDTO,
  ReportPresenterDTO[]
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super(GetNearbyReportUseCase.name);
  }

  async execute(
    dto: GetNearbyReportDTO,
  ): Promise<BaseResult<ReportPresenterDTO[]>> {
    this.logStartExecution(dto);

    const { geoHash, reportId, userId, latitude, longitude } = dto;

    let encodedGeohash: string | undefined;
    if (!geoHash && (!latitude || !longitude)) {
      throw new Error(
        'Either geoHash or latitude and longitude must be provided',
      );
    } else if (latitude && longitude) {
      encodedGeohash = GeoHash.encode(latitude, longitude, GEOHASH_PRECISSION);
    } else {
      encodedGeohash = geoHash;
    }

    const reports = await this.reportService.getNearbyReports({
      // for now, trim to 6 characters
      geoHash: encodedGeohash!.substring(0, GEOHASH_SEARCH_PRECISSION),
      excludedReportId: reportId,
      userId,
      limit: NEARBY_REPORT_LIMIT,
    });

    this.logEndExecution();
    return this.ok(
      this.mapper.mapArray(reports, ReportDomain, ReportPresenterDTO),
    );
  }
}
