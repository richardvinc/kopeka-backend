import { AuthModule } from '@libs/auth/auth.module';
import appConfig from '@libs/config/app/app-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
