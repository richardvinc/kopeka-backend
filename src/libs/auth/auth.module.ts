import { AuthConfigModule } from '@libs/config/auth/auth-config.module';
import { FirebaseAdminModule } from '@libs/providers/firebase-admin/firebase-admin.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: 'jwtStrategy' }),
    FirebaseAdminModule,
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
