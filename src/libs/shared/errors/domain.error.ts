import slugify from 'slugify';

import { HttpErrorResponse } from '@libs/shared/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseDomainError extends HttpException {
  constructor(
    readonly domain: string,
    readonly cause: Error,
    readonly description?: string,
  ) {
    super('', HttpStatus.BAD_REQUEST);
  }

  getResponse(): HttpErrorResponse {
    return {
      error: {
        error_code: `${this.domain}/${slugify(
          this.description ?? this.cause.message,
          {
            replacement: '-',
            lower: true,
          },
        )}`,
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
