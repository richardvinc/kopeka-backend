import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportEntity } from './entities/report.entity';
import { GPSLocationMapperProfile } from './mappers/gps-location.mapper';
import { ReportMapperProfile } from './mappers/report.mapper';
import { ReportController } from './report.controller';
import { CreateReportUseCase } from './use-cases/create-report.use-case';

const useCases = [CreateReportUseCase];
const mappers = [GPSLocationMapperProfile, ReportMapperProfile];

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  providers: [...useCases, ...mappers],
  exports: [],
  controllers: [ReportController],
})
export class ReportModule {}
