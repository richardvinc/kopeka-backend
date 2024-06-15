import {
  CAMPAIGN_JOURNEY_SERVICE,
  CAMPAIGN_SERVICE,
} from '@libs/campaign/campaign.constant';
import { CampaignJourneyDomain } from '@libs/campaign/domain/campaign-journey.domain';
import { CampaignError } from '@libs/campaign/errors/campaign.error';
import { CampaignJourneyService } from '@libs/campaign/services/campaign-journey.service';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { PostUserLocationDTO } from './post-user-location.dto';

export class PostUserLocationUseCase extends BaseUseCase<
  PostUserLocationDTO,
  void
> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private campaignService: CampaignService,
    @Inject(CAMPAIGN_JOURNEY_SERVICE)
    private campaignJourneyService: CampaignJourneyService,
  ) {
    super(PostUserLocationUseCase.name);
  }

  async execute(dto: PostUserLocationDTO): Promise<void> {
    this.logStartExecution(dto);

    const campaign = await this.campaignService.getCampaignByShortcode(
      dto.campaignShortcode,
    );
    if (!campaign) {
      this.logger.error(`Campaign not found`);
      throw new CampaignError.CampaignNotFound();
    }

    const campaignJourney = new CampaignJourneyDomain({
      campaignShortcode: dto.campaignShortcode,
      userId: dto.userId,
      location: {
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
    });

    await this.campaignJourneyService.postUserLocation(campaignJourney);

    this.logEndExecution();
  }
}
