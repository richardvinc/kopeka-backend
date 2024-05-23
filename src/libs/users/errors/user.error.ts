/* eslint-disable @typescript-eslint/no-namespace */
import { BaseNotFoundError } from '@libs/shared/errors/not-found.error';

export namespace UserError {
  const domain = 'user';

  export class UserNotFound extends BaseNotFoundError {
    constructor() {
      super(domain, 'User not found');
    }
  }
}
