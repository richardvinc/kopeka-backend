import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import authConfig from './auth-config.factory';
import { AuthConfigService } from './auth-config.service';

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  providers: [ConfigService, AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule {}
