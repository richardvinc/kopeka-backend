import { FirebaseAdminModule } from '@libs/providers/firebase-admin/firebase-admin.module';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserService } from '@libs/users/services/user.service';
import { UserModule } from '@libs/users/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FIREBASE_AUTH_STRATEGY } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: FIREBASE_AUTH_STRATEGY }),
    FirebaseAdminModule,
    UserModule,
  ],
  providers: [FirebaseAuthStrategy, AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
