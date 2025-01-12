import { Public } from '@libs/auth/decorators/public.decorator';
import { Controller, Get, Param, Query } from '@nestjs/common';

import { GetPublicReportByIdDTO } from './use-cases/public/get-public-report-by-id/get-public-report-by-id.dto';
import { GetPublicReportByIdReportUseCase } from './use-cases/public/get-public-report-by-id/get-public-report-by-id.use-case';
import { GetPublicReportCountUseCase } from './use-cases/public/get-public-report-count/get-public-report-count.use-case';
import { GetPublicReportDTO } from './use-cases/public/get-public-report/get-public-report.dto';
import { GetPublicReportUseCase } from './use-cases/public/get-public-report/get-public-report.use-case';

@Public()
@Controller('public-reports')
export class PublicReportController {
  constructor(
    private getPublicReportUseCase: GetPublicReportUseCase,
    private getPublicReportCountUseCase: GetPublicReportCountUseCase,
    private getPublicReportByIdUseCase: GetPublicReportByIdReportUseCase,
  ) {}

  @Get()
  async getPublicReports(@Query() dto: GetPublicReportDTO) {
    return await this.getPublicReportUseCase.execute(dto);
  }

  @Get('/count')
  async getPublicReportCount() {
    return await this.getPublicReportCountUseCase.execute();
  }

  @Get('/:reportId')
  async getPublicReportById(@Param() dto: GetPublicReportByIdDTO) {
    return await this.getPublicReportByIdUseCase.execute(dto);
  }
}
