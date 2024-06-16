import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CAMPAIGN_SERVICE } from '@libs/campaign/campaign.constant';
import { CampaignDomain } from '@libs/campaign/domain/campaign.domain';
import { CampaignError } from '@libs/campaign/errors/campaign.error';
import { CampaignPresenterDTO } from '@libs/campaign/presenters/campaign.presenter';
import { CampaignService } from '@libs/campaign/services/campaign.service';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetCampaignByShortcodeDTO } from './get-campaign-by-shortcode.dto';

export class GetCampaignByShortcodeUseCase extends BaseUseCase<
  GetCampaignByShortcodeDTO,
  CampaignPresenterDTO
> {
  constructor(
    @Inject(CAMPAIGN_SERVICE)
    private campaignService: CampaignService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    super(GetCampaignByShortcodeUseCase.name);
  }

  async execute(
    dto: GetCampaignByShortcodeDTO,
  ): Promise<BaseResult<CampaignPresenterDTO>> {
    this.logStartExecution(dto);
    const campaign = await this.campaignService.getCampaignByShortcode(
      dto.campaignShortcode,
    );

    if (!campaign) throw new CampaignError.CampaignNotFound();

    this.logEndExecution();
    return this.ok(
      this.mapper.map(campaign, CampaignDomain, CampaignPresenterDTO),
    );
  }
}
