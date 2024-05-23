import { HttpErrorResponse } from '@libs/shared/interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseNotFoundError extends HttpException {
  constructor(
    readonly domain: string,
    readonly cause: Error | any,
  ) {
    super('', HttpStatus.NOT_FOUND);
  }

  getResponse(): HttpErrorResponse {
    return {
      ok: false,
      error: {
        error_code: `${this.domain}/not-found`,
        message:
          process.env.NODE_ENV === 'development'
            ? this.cause?.stack
            : undefined,
        error_date: new Date().toISOString(),
        result_type: `Not Found Error`,
      },
    };
  }
}
