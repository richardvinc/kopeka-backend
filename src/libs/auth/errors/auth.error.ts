/* eslint-disable @typescript-eslint/no-namespace */
import slugify from 'slugify';

import { HttpErrorResponse } from '@libs/shared/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseAuthError extends HttpException {
  constructor(
    readonly description: string,
    readonly cause: Error,
  ) {
    super('', HttpStatus.UNAUTHORIZED);
  }

  getResponse(): HttpErrorResponse {
    return {
      ok: false,
      error: {
        error_code: `auth/${slugify(this.description, {
          replacement: '-',
          lower: true,
        })}`,
        message:
          process.env.NODE_ENV === 'development'
            ? this.cause?.stack
            : undefined,
        error_date: new Date().toISOString(),
        http_status_code: HttpStatus.UNAUTHORIZED,
        result_type: 'Authorization Error',
      },
    };
  }
}

export namespace AuthErrors {
  export class InvalidToken extends BaseAuthError {
    constructor(cause: Error) {
      super('Invalid token', cause);
    }
  }

  export class UserNotFound extends BaseAuthError {
    constructor(cause: Error) {
      super('User not found', cause);
    }
  }
}
