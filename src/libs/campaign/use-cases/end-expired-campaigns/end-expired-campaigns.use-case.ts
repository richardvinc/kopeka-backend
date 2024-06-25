import {
  CAMPAIGN_JOURNEY_SERVICE,
  CAMPAIGN_SERVICE,
} from '@libs/campaign/campaign.constant';
import { CampaignJourneyService } from '@libs/campaign/services/campaign-journey.service';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { EndExpiredCampaignsDTO } from './end-expired-campaigns.dto';

export class EndExpiredCampaignsUseCase extends BaseUseCase<
  EndExpiredCampaignsDTO,
  void
> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private campaignService: CampaignService,
    @Inject(CAMPAIGN_JOURNEY_SERVICE)
    private campaignJourneyService: CampaignJourneyService,
  ) {
    super(EndExpiredCampaignsUseCase.name);
  }

  async execute(dto: EndExpiredCampaignsDTO): Promise<void> {
    this.logStartExecution(dto);
    const expiredCampaignIds = await this.campaignService.endExpiredCampaigns(
      dto.expiredDate,
    );
    if (expiredCampaignIds.length > 0) {
      expiredCampaignIds.forEach(async (campaignId) => {
        await this.campaignJourneyService.generateMapImage(campaignId);
      });
    }
    this.logEndExecution();
  }
}
