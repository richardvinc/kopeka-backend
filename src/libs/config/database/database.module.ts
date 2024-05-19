import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import databaseConfig from './database-config';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [ConfigService, DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
