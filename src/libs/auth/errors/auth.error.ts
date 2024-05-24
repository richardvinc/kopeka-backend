/* eslint-disable @typescript-eslint/no-namespace */
import slugify from 'slugify';

import { HttpErrorResponse } from '@libs/shared/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseAuthError extends HttpException {
  constructor(
    readonly cause: Error,
    readonly description?: string,
  ) {
    super('', HttpStatus.UNAUTHORIZED);
  }

  getResponse(): HttpErrorResponse {
    return {
      ok: false,
      error: {
        error_code: `auth/${slugify(this.description ?? this.cause.message, {
          replacement: '-',
          lower: true,
        })}`,
        message:
          process.env.NODE_ENV === 'development'
            ? this.cause?.stack
            : undefined,
        error_date: new Date().toISOString(),
        result_type: 'Authorization Error',
      },
    };
  }
}

export namespace AuthErrors {
  export class InvalidToken extends BaseAuthError {
    constructor(cause: Error) {
      super(cause, 'Invalid token');
    }
  }

  export class UserNotFound extends BaseAuthError {
    constructor() {
      super(new Error('User not found'));
    }
  }
}
