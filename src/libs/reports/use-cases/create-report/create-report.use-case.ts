import * as GeoHash from 'ngeohash';
import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { InjectRepository } from '@nestjs/typeorm';

import { ReportDomain } from '../../domains/report.domain';
import { ReportEntity } from '../../entities/report.entity';
import { ReportPresenterDTO } from '../../presenters/report.presenter';
import { GEOHASH_PRECISSION } from '../../report.constant';
import { CreateReportDTO } from './create-report.dto';

export class CreateReportUseCase extends BaseUseCase<
  CreateReportDTO,
  ReportPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
  ) {
    super();
  }

  async execute(dto: CreateReportDTO): Promise<ReportPresenterDTO> {
    const geoHash: string = GeoHash.encode(
      dto.lat,
      dto.lon,
      GEOHASH_PRECISSION,
    );

    const report = ReportDomain.create({
      ...dto,
      location: {
        lat: dto.lat,
        lon: dto.lon,
        geoHash,
      },
    });

    const createdReport = await this.reportRepository.save(
      this.mapper.map(report, ReportDomain, ReportEntity),
    );

    return this.mapper.map(createdReport, ReportEntity, ReportPresenterDTO);
  }
}
