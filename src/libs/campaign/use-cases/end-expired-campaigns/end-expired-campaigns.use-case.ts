import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
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
  ) {
    super(EndExpiredCampaignsUseCase.name);
  }

  async execute(dto: EndExpiredCampaignsDTO): Promise<void> {
    this.logStartExecution(dto);
    await this.campaignService.endExpiredCampaigns(dto.expiredDate);
    this.logEndExecution();
  }
}
