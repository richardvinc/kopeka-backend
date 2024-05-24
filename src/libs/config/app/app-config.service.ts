import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): string {
    return this.configService.getOrThrow('PORT');
  }

  get nodeEnv(): string {
    return this.configService.getOrThrow('NODE_ENV');
  }

  get paginationTokenSecret(): string {
    return this.configService.getOrThrow('PAGINATION_TOKEN_SECRET');
  }
}
