/* eslint-disable @typescript-eslint/no-namespace */
import { BaseDomainError } from '@libs/shared/errors/domain.error';
import { BaseNotFoundError } from '@libs/shared/errors/not-found.error';

export namespace CampaignError {
  const domain = 'campaign';

  export class CampaignNotFound extends BaseNotFoundError {
    constructor() {
      super(domain, 'not found');
    }
  }

  export class UserAlreadyInAnotherCampaign extends BaseDomainError {
    constructor() {
      super(domain, new Error('user already registered in another campaign'));
    }
  }

  export class UserNotRegisteredInAnyCampaign extends BaseDomainError {
    constructor() {
      super(domain, new Error('user not registered in any campaign'));
    }
  }
}
