import {
  CAMPAIGN_JOURNEY_SERVICE,
  CAMPAIGN_SERVICE,
} from '@libs/campaign/campaign.constant';
import { CampaignJourneyDomain } from '@libs/campaign/domain/campaign-journey.domain';
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

    const campaignJourney = new CampaignJourneyDomain({
      campaignId: dto.campaignId,
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
