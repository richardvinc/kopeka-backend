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

  export class CannotLeaveAsCampaignHost extends BaseDomainError {
    constructor() {
      super(domain, new Error('campaign host cannot leave campaign'));
    }
  }

  export class OnlyHostCanEndCampaign extends BaseDomainError {
    constructor() {
      super(domain, new Error('only host can end the campaign'));
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
