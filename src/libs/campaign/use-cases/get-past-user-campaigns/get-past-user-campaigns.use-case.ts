import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
import { CampaignDomain } from '@libs/campaign/domain/campaign.domain';
import { CampaignPresenterDTO } from '@libs/campaign/presenters/campaign.presenter';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetPastUserCampaignsDTO } from './get-past-user-campaigns.dto';

export class GetPastUserCampaignsUseCase extends BaseUseCase<
  GetPastUserCampaignsDTO,
  CampaignPresenterDTO[]
> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private readonly campaignService: CampaignService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    super(GetPastUserCampaignsUseCase.name);
  }

  async execute(
    dto: GetPastUserCampaignsDTO,
  ): Promise<BaseResult<CampaignPresenterDTO[]>> {
    this.logStartExecution(dto);
    const { userId } = dto;

    const campaigns = await this.campaignService.getCampaignsByUserId(
      userId,
      true,
    );

    this.logEndExecution();
    return this.ok(
      this.mapper.mapArray(campaigns, CampaignDomain, CampaignPresenterDTO),
    );
  }
}
