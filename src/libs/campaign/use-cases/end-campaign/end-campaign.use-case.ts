import {
  CAMPAIGN_JOURNEY_SERVICE,
  CAMPAIGN_SERVICE,
} from '@libs/campaign/campaign.constant';
import { CampaignError } from '@libs/campaign/errors/campaign.error';
import { CampaignPresenterDTO } from '@libs/campaign/presenters/campaign.presenter';
import { CampaignJourneyService } from '@libs/campaign/services/campaign-journey.service';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { EndCampaignDTO } from './end-campaign.dto';

export class EndCampaignUseCase extends BaseUseCase<
  EndCampaignDTO,
  CampaignPresenterDTO
> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private campaignService: CampaignService,
    @Inject(CAMPAIGN_JOURNEY_SERVICE)
    private campaignJourneyService: CampaignJourneyService,
  ) {
    super(EndCampaignUseCase.name);
  }

  async execute(dto: EndCampaignDTO): Promise<void> {
    this.logStartExecution(dto);

    const campaign = await this.campaignService.getCampaignById(dto.campaignId);
    if (!campaign) {
      this.logEndExecution();
      throw new CampaignError.CampaignNotFound();
    }

    if (campaign.createdById !== dto.userId) {
      this.logEndExecution();
      throw new CampaignError.OnlyHostCanEndCampaign();
    }

    await this.campaignService.endCampaign(campaign.id);
    // await this.campaignJourneyService.generateMapJourney(campaign.id);

    this.logEndExecution();
  }
}
