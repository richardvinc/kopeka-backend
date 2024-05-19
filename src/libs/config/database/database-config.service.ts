import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get pgDatabaseUrl(): string {
    return this.configService.getOrThrow<string>('PG_DATABASE_URL');
  }
}
