import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
import { CampaignError } from '@libs/campaign/errors/campaign.error';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserError } from '@libs/users/errors/user.error';
import { UserService } from '@libs/users/services/user.service';
import { USER_SERVICE } from '@libs/users/user.contants';
import { Inject } from '@nestjs/common';

import { LeaveCampaignDTO } from './leave-campaign.dto';

export class LeaveCampaignUseCase extends BaseUseCase<LeaveCampaignDTO, void> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private readonly campaignService: CampaignService,
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
  ) {
    super(LeaveCampaignUseCase.name);
  }

  async execute(dto: LeaveCampaignDTO): Promise<void> {
    this.logStartExecution(dto);

    const user = await this.userService.getUserById(dto.userId);
    if (!user) {
      this.logEndExecution();
      throw new UserError.UserNotFound();
    }
    if (!user.activeCampaignId) {
      this.logEndExecution();
      throw new CampaignError.UserNotRegisteredInAnyCampaign();
    }

    const campaign = await this.campaignService.getCampaignByShortcode(
      dto.campaignShortcode,
    );
    if (!campaign) {
      this.logEndExecution();
      throw new CampaignError.CampaignNotFound();
    }

    if (campaign.createdById === dto.userId) {
      this.logEndExecution();
      throw new CampaignError.CannotLeaveAsCampaignHost();
    }

    await this.campaignService.leaveCampaign(dto.campaignShortcode, dto.userId);
    this.logEndExecution();
  }
}
