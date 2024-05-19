import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get dbPort(): string {
    return this.configService.getOrThrow<string>('DB_PORT');
  }

  get postgresUrl(): string {
    return this.configService.getOrThrow<string>('POSTGRES_URL');
  }
}
