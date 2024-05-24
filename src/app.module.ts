import './libs/shared/extensions/typeorm/polyfill';

import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { AuthModule } from '@libs/auth/auth.module';
import { AppConfigModule } from '@libs/config/app';
import { DatabaseModule } from '@libs/database/database.module';
import { ReportModule } from '@libs/reports/report.module';
import { UserModule } from '@libs/users/user.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
      namingConventions: new CamelCaseNamingConvention(),
    }),
    AppConfigModule,
    AuthModule,
    DatabaseModule,
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
