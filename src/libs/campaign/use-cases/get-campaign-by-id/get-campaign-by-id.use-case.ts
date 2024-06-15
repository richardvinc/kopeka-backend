import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
import { CampaignDomain } from '@libs/campaign/domain/campaign.domain';
import { CampaignError } from '@libs/campaign/errors/campaign.error';
import { CampaignPresenterDTO } from '@libs/campaign/presenters/campaign.presenter';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject, Logger } from '@nestjs/common';

import { GetCampaignByIdDTO } from './get-campaign-by-id.dto';

export class GetCampaignByIdUseCase extends BaseUseCase<
  GetCampaignByIdDTO,
  CampaignPresenterDTO
> {
  private readonly logger = new Logger(GetCampaignByIdUseCase.name);
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private campaignService: CampaignService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    super();
  }

  async execute(
    dto: GetCampaignByIdDTO,
  ): Promise<BaseResult<CampaignPresenterDTO>> {
    this.logger.log(`START: execute`);
    this.logger.log(`dto: ${JSON.stringify(dto)}`);
    const campaign = await this.campaignService.getCampaignById(dto.campaignId);

    if (!campaign) throw new CampaignError.CampaignNotFound();

    this.logger.log(`END: execute`);
    return this.ok(
      this.mapper.map(campaign, CampaignDomain, CampaignPresenterDTO),
    );
  }
}
