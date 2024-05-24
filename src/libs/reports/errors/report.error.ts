/* eslint-disable @typescript-eslint/no-namespace */
import { BaseNotFoundError } from '@libs/shared/errors/not-found.error';

export namespace ReportError {
  const domain = 'report';

  export class ReportNotFound extends BaseNotFoundError {
    constructor() {
      super(domain, 'not found');
    }
  }
}
