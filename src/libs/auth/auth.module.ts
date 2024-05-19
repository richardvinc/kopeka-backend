import { AuthConfigModule } from '@libs/config/auth/auth-config.module';
import { FirebaseAdminModule } from '@libs/providers/firebase-admin/firebase-admin.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { FIREBASE_AUTH_STRATEGY } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';

@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: FIREBASE_AUTH_STRATEGY }),
    FirebaseAdminModule,
  ],
  providers: [FirebaseAuthStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
