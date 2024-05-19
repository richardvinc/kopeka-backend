import { AuthConfigModule } from '@libs/config/auth/auth-config.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies';

@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: 'jwtStrategy' }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
