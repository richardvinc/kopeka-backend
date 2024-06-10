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
import { Inject, Logger } from '@nestjs/common';

import { GetNearbyReportDTO } from './get-nearby-report.dto';

export class GetNearbyReportUseCase extends BaseUseCase<
  GetNearbyReportDTO,
  ReportPresenterDTO[]
> {
  private readonly logger = new Logger(GetNearbyReportUseCase.name);

  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(REPORT_SERVICE)
    private reportService: ReportService,
  ) {
    super();
  }

  async execute(
    dto: GetNearbyReportDTO,
  ): Promise<BaseResult<ReportPresenterDTO[]>> {
    this.logger.log(`START: execute`);
    this.logger.log(`dto: ${JSON.stringify(dto)}`);

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

    this.logger.log(`END: execute`);
    return this.ok(
      this.mapper.mapArray(reports, ReportDomain, ReportPresenterDTO),
    );
  }
}
