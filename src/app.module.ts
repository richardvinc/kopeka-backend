import { AuthModule } from '@libs/auth/auth.module';
import appConfig from '@libs/config/app/app-config';
import { DatabaseModule } from '@libs/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      cache: true,
    }),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
