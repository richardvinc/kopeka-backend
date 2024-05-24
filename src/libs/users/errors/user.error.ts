/* eslint-disable @typescript-eslint/no-namespace */
import { BaseDomainError } from '@libs/shared/errors/domain.error';
import { BaseNotFoundError } from '@libs/shared/errors/not-found.error';

export namespace UserError {
  const domain = 'user';

  export class UserNotFound extends BaseNotFoundError {
    constructor() {
      super(domain, 'not found');
    }
  }

  export class UserAlreadyExists extends BaseDomainError {
    constructor() {
      super(domain, new Error('already exists'));
    }
  }

  export class UserAlreadyRegistered extends BaseDomainError {
    constructor() {
      super(domain, new Error('already registered'));
    }
  }

  export class IvalidFirebaseUid extends BaseDomainError {
    constructor() {
      super(domain, new Error('Invalid Firebase Uid'));
    }
  }
}
