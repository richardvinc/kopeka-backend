import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
import { CampaignDomain } from '@libs/campaign/domain/campaign.domain';
import { CampaignPresenterDTO } from '@libs/campaign/presenters/campaign.presenter';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { DateUtils } from '@libs/shared/utils/date.utils';
import { Inject } from '@nestjs/common';

import { CreateCampaignDTO } from './create-campaign.dto';

export class CreateCampaignUseCase extends BaseUseCase<
  CreateCampaignDTO,
  CampaignPresenterDTO
> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private campaignService: CampaignService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    super(CreateCampaignUseCase.name);
  }

  async execute(
    dto: CreateCampaignDTO,
  ): Promise<BaseResult<CampaignPresenterDTO>> {
    this.logStartExecution(dto);

    const campaignShortcode =
      await this.campaignService.generateUniqueCampaignShortcode();
    // default 24 hours from now
    const expiredAt = dto.expiredAt || DateUtils.addHours(new Date(), 24);

    const campaign = new CampaignDomain({
      expiredAt,
      createdById: dto.userId,
      campaignShortcode,
    });

    const entity = await this.campaignService.createCampaign(campaign);

    this.logEndExecution();
    return this.ok(
      this.mapper.map(entity, CampaignDomain, CampaignPresenterDTO),
    );
  }
}
