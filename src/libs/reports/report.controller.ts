import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateReportDTO } from './use-cases/create-report/create-report.dto';
import { CreateReportUseCase } from './use-cases/create-report/create-report.use-case';
import { GetNearbyReportDTO } from './use-cases/get-nearby-report/get-nearby-report.dto';
import { GetNearbyReportUseCase } from './use-cases/get-nearby-report/get-nearby-report.use-case';
import { GetReportByIdDTO } from './use-cases/get-report-by-id/get-report-by-id.dto';
import { GetReportByIdUseCase } from './use-cases/get-report-by-id/get-report-by-id.use-case';

@UseGuards(FirebaseAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(
    private createReportUseCase: CreateReportUseCase,
    private getReportByIdUseCase: GetReportByIdUseCase,
    private getNearbyReportsUseCase: GetNearbyReportUseCase,
  ) {}

  @Post()
  async createNewReport(
    @User() user: IUserIdentity,
    @Body() dto: CreateReportDTO,
  ) {
    return this.createReportUseCase.execute({ ...dto, reportedById: user.id });
  }

  @Get('/id/:id')
  async getReportById(@Param() dto: GetReportByIdDTO) {
    return this.getReportByIdUseCase.execute(dto);
  }

  @Get('/nearby')
  async getNearbyReports(@Body() dto: GetNearbyReportDTO) {
    return this.getNearbyReportsUseCase.execute(dto);
  }
}
