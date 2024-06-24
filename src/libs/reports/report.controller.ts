import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateReportDTO } from './use-cases/create-report/create-report.dto';
import { CreateReportUseCase } from './use-cases/create-report/create-report.use-case';
import { DeleteReportDTO } from './use-cases/delete-report/delete-report.dto';
import { DeleteReportUseCase } from './use-cases/delete-report/delete-report.use.case';
import { GetImageUploadUrlDTO } from './use-cases/get-image-upload-url/get-image-upload-url.dto';
import { GetImageUploadUrlUseCase } from './use-cases/get-image-upload-url/get-image-upload-url.use-case';
import { GetLatestReportsDTO } from './use-cases/get-latest-reports/get-latest-reports.dto';
import { GetLatestReportsUseCase } from './use-cases/get-latest-reports/get-latest-reports.use-case';
import { GetNearbyReportDTO } from './use-cases/get-nearby-report/get-nearby-report.dto';
import { GetNearbyReportUseCase } from './use-cases/get-nearby-report/get-nearby-report.use-case';
import { GetReportByIdDTO } from './use-cases/get-report-by-id/get-report-by-id.dto';
import { GetReportByIdUseCase } from './use-cases/get-report-by-id/get-report-by-id.use-case';
import { GetReportsByCampaignIdDTO } from './use-cases/get-reports-by-campaign-id/get-reports-by-campaign-id.dto';
import { GetReportsByCampaignIdUseCase } from './use-cases/get-reports-by-campaign-id/get-reports-by-campaign-id.use-case';
import { LikeReportDTO } from './use-cases/like-report/like-report.dto';
import { LikeReportUseCase } from './use-cases/like-report/like-report.use-case';
import { UnlikeReportUseCase } from './use-cases/unlike-report/unlike-report.use-case';

@UseGuards(FirebaseAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(
    private createReportUseCase: CreateReportUseCase,
    private getReportByIdUseCase: GetReportByIdUseCase,
    private getReportByCampaignIdUseCase: GetReportsByCampaignIdUseCase,
    private getNearbyReportsUseCase: GetNearbyReportUseCase,
    private likeReportUseCase: LikeReportUseCase,
    private unlikeReportUseCase: UnlikeReportUseCase,
    private getLatestReportsUseCase: GetLatestReportsUseCase,
    private getImageUploadURLUseCase: GetImageUploadUrlUseCase,
    private deleteReportUseCase: DeleteReportUseCase,
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

  @Get('/image-upload-url')
  async getImageUploadURL(@Query() dto: GetImageUploadUrlDTO) {
    return await this.getImageUploadURLUseCase.execute({ ...dto });
  }

  @Get('/campaign/:campaignId')
  async getReportsByCampaignId(
    @User() user: IUserIdentity,
    @Param() dto: GetReportsByCampaignIdDTO,
  ) {
    return await this.getReportByCampaignIdUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }

  @Get('/nearby')
  async getNearbyReports(
    @User() user: IUserIdentity,
    @Query() dto: GetNearbyReportDTO,
  ) {
    return await this.getNearbyReportsUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }

  @Get('/latest')
  async getLatestReports(
    @User() user: IUserIdentity,
    @Query() dto: GetLatestReportsDTO,
  ) {
    return await this.getLatestReportsUseCase.execute({
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

  @Delete('/:reportId')
  async deleteReportById(
    @User() user: IUserIdentity,
    @Param() dto: DeleteReportDTO,
  ) {
    return await this.deleteReportUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }

  @Post('/:reportId/like')
  async likeReport(@User() user: IUserIdentity, @Param() dto: LikeReportDTO) {
    return await this.likeReportUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }

  @Post('/:reportId/unlike')
  async unlikeReport(@User() user: IUserIdentity, @Param() dto: LikeReportDTO) {
    return await this.unlikeReportUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }
}
