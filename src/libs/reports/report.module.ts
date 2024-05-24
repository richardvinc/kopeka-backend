import { AppConfigModule } from '@libs/config/app';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportLikeEntity } from './entities/report-like.entity';
import { ReportEntity } from './entities/report.entity';
import { GPSLocationMapperProfile } from './mappers/gps-location.mapper';
import { ReportMapperProfile } from './mappers/report.mapper';
import { PAGINATION_TOKEN_SERVICE, REPORT_SERVICE } from './report.constant';
import { ReportController } from './report.controller';
import { PaginationTokenService } from './services/pagination-token.service';
import { ReportService } from './services/report.service';
import { CreateReportUseCase } from './use-cases/create-report/create-report.use-case';
import { GetLatestReportsUseCase } from './use-cases/get-latest-reports/get-latest-reports.use-case';
import { GetNearbyReportUseCase } from './use-cases/get-nearby-report/get-nearby-report.use-case';
import { GetReportByIdUseCase } from './use-cases/get-report-by-id/get-report-by-id.use-case';
import { LikeReportUseCase } from './use-cases/like-report/like-report.use-case';

const useCases = [
  CreateReportUseCase,
  GetNearbyReportUseCase,
  GetReportByIdUseCase,
  LikeReportUseCase,
  GetLatestReportsUseCase,
];
const mappers = [GPSLocationMapperProfile, ReportMapperProfile];
const services: Provider[] = [
  {
    provide: REPORT_SERVICE,
    useClass: ReportService,
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
  ],
  providers: [...services, ...useCases, ...mappers],
  exports: [...services],
  controllers: [ReportController],
})
export class ReportModule {}
