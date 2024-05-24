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
import { LikeReportDTO } from './use-cases/like-report/like-report.dto';
import { LikeReportUseCase } from './use-cases/like-report/like-report.use-case';

@UseGuards(FirebaseAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(
    private createReportUseCase: CreateReportUseCase,
    private getReportByIdUseCase: GetReportByIdUseCase,
    private getNearbyReportsUseCase: GetNearbyReportUseCase,
    private likeReportUseCase: LikeReportUseCase,
  ) {}

  @Post()
  async createNewReport(
    @User() user: IUserIdentity,
    @Body() dto: CreateReportDTO,
  ) {
    return await this.createReportUseCase.execute({
      ...dto,
      reportedById: user.id,
    });
  }

  @Get('/nearby')
  async getNearbyReports(
    @User() user: IUserIdentity,
    @Body() dto: GetNearbyReportDTO,
  ) {
    return await this.getNearbyReportsUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }

  @Get('/:reportId')
  async getReportById(
    @User() user: IUserIdentity,
    @Param() dto: GetReportByIdDTO,
  ) {
    return await this.getReportByIdUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }

  @Post('/:reportId/like')
  async likeReport(@User() user: IUserIdentity, @Param() dto: LikeReportDTO) {
    return await this.likeReportUseCase.execute({ ...dto, userId: user.id });
  }
}
