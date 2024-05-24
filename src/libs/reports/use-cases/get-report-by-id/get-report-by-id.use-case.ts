import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ReportEntity } from '@libs/reports/entities/report.entity';
import { ReportError } from '@libs/reports/errors/report.error';
import { ReportPresenterDTO } from '@libs/reports/presenters/report.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { InjectRepository } from '@nestjs/typeorm';

import { GetReportByIdDTO } from './get-report-by-id.dto';

export class GetReportByIdUseCase extends BaseUseCase<
  GetReportByIdDTO,
  ReportPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) {
    super();
  }

  async execute(dto: GetReportByIdDTO): Promise<ReportPresenterDTO> {
    const report = await this.reportRepository.findOneBy({
      id: dto.id,
    });
    if (!report) throw new ReportError.ReportNotFound();

    return this.mapper.map(report, ReportEntity, ReportPresenterDTO);
  }
}
