import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportLikeEntity } from './entities/report-like.entity';
import { ReportEntity } from './entities/report.entity';
import { GPSLocationMapperProfile } from './mappers/gps-location.mapper';
import { ReportMapperProfile } from './mappers/report.mapper';
import { ReportController } from './report.controller';
import { ReportService } from './services/report.service';
import { CreateReportUseCase } from './use-cases/create-report/create-report.use-case';
import { GetNearbyReportUseCase } from './use-cases/get-nearby-report/get-nearby-report.use-case';
import { GetReportByIdUseCase } from './use-cases/get-report-by-id/get-report-by-id.use-case';

const useCases = [
  CreateReportUseCase,
  GetNearbyReportUseCase,
  GetReportByIdUseCase,
];
const mappers = [GPSLocationMapperProfile, ReportMapperProfile];

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, ReportLikeEntity])],
  providers: [ReportService, ...useCases, ...mappers],
  exports: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
