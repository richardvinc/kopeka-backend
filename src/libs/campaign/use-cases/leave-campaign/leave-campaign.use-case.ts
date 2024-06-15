import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { LeaveCampaignDTO } from './leave-campaign.dto';

export class LeaveCampaignUseCase extends BaseUseCase<LeaveCampaignDTO, void> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private readonly campaignService: CampaignService,
  ) {
    super(LeaveCampaignUseCase.name);
  }

  async execute(dto: LeaveCampaignDTO): Promise<void> {
    this.logStartExecution(dto);
    await this.campaignService.leaveCampaign(dto.campaignId, dto.userId);
    this.logEndExecution();
  }
}
