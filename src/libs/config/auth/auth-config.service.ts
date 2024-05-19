import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtSecret(): string {
    return this.configService.getOrThrow('JWT_SECRET');
  }
}
