import slugify from 'slugify';

import { HttpErrorResponse } from '@libs/shared/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseDomainError extends HttpException {
  constructor(
    readonly domain: string,
    readonly description: string,
    readonly cause: Error,
  ) {
    super('', HttpStatus.BAD_REQUEST);
  }

  getResponse(): HttpErrorResponse {
    return {
      ok: false,
      error: {
        error_code: `${this.domain}/${slugify(this.description, {
          replacement: '-',
          lower: true,
        })}`,
        message:
          process.env.NODE_ENV === 'development'
            ? this.cause?.stack
            : undefined,
        error_date: new Date().toISOString(),
        result_type: 'Domain Error',
      },
    };
  }
}
