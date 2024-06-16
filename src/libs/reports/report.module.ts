import { AppConfigModule } from '@libs/config/app';
import { AzureStorageModule } from '@libs/providers/azure-storage/azure-storage.module';
import { AzureStorageService } from '@libs/providers/azure-storage/azure-storage.service';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportLikeEntity } from './entities/report-like.entity';
import { ReportEntity } from './entities/report.entity';
import { GPSLocationMapperProfile } from './mappers/gps-location.mapper';
import { ReportMapperProfile } from './mappers/report.mapper';
import {
  PAGINATION_TOKEN_SERVICE,
  REPORT_IMAGE_STORAGE_SERVICE,
  REPORT_SERVICE,
} from './report.constant';
import { ReportController } from './report.controller';
import { PaginationTokenService } from './services/pagination-token.service';
import { ReportImageStorageService } from './services/report-image-storage.service';
import { ReportService } from './services/report.service';
import { CreateReportUseCase } from './use-cases/create-report/create-report.use-case';
import { GetImageUploadUrlUseCase } from './use-cases/get-image-upload-url/get-image-upload-url.use-case';
import { GetLatestReportsUseCase } from './use-cases/get-latest-reports/get-latest-reports.use-case';
import { GetNearbyReportUseCase } from './use-cases/get-nearby-report/get-nearby-report.use-case';
import { GetReportByIdUseCase } from './use-cases/get-report-by-id/get-report-by-id.use-case';
import { GetReportsByCampaignIdUseCase } from './use-cases/get-reports-by-campaign-id/get-reports-by-campaign-id.use-case';
import { LikeReportUseCase } from './use-cases/like-report/like-report.use-case';

const useCases = [
  CreateReportUseCase,
  GetNearbyReportUseCase,
  GetReportByIdUseCase,
  GetReportsByCampaignIdUseCase,
  LikeReportUseCase,
  GetLatestReportsUseCase,
  GetImageUploadUrlUseCase,
];
const mappers = [GPSLocationMapperProfile, ReportMapperProfile];
const services: Provider[] = [
  {
    provide: REPORT_SERVICE,
    useClass: ReportService,
  },
  {
    provide: REPORT_IMAGE_STORAGE_SERVICE,
    useClass: ReportImageStorageService,
  },
  {
    provide: PAGINATION_TOKEN_SERVICE,
    useClass: PaginationTokenService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportEntity, ReportLikeEntity]),
    AppConfigModule,
    AzureStorageModule,
  ],
  providers: [...services, ...useCases, ...mappers, AzureStorageService],
  exports: [...services],
  controllers: [ReportController],
})
export class ReportModule {}
