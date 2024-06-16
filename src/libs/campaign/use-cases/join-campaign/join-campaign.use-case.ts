import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { JoinCampaignDTO } from './join-campaign.dto';

export class JoinCampaignUseCase extends BaseUseCase<JoinCampaignDTO, void> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private readonly campaignService: CampaignService,
  ) {
    super(JoinCampaignUseCase.name);
  }

  async execute(dto: JoinCampaignDTO): Promise<void> {
    this.logStartExecution(dto);
    await this.campaignService.joinCampaign(dto.campaignShortcode, dto.userId);
    this.logEndExecution();
  }
}
