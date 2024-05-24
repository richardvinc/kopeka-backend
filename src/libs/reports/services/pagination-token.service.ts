import { AppConfigService } from '@libs/config/app/app-config.service';
import { CipherUtils } from '@libs/shared/utils/cipher.utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationTokenService {
  constructor(private appConfigService: AppConfigService) {}

  encodeToken(token: number): string {
    return CipherUtils.encryptData(
      token.toString(),
      this.appConfigService.paginationTokenSecret,
    );
  }

  decodeToken(token: string): string {
    return CipherUtils.decryptData(
      token,
      this.appConfigService.paginationTokenSecret,
    );
  }
}
