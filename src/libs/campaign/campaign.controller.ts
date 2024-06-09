import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CAMPAIGN_JOURNEY_REPOSITORY,
  CAMPAIGN_SERVICE,
} from './campaign.constant';
import { CampaignJourneyDomain } from './domain/campaign-journey.domain';
import { CampaignDomain } from './domain/campaign.domain';
import { CampaignJourneyCosmosdbEntity } from './entities/campaign-journey.cosmosdb-entity';
import { CampaignEntity } from './entities/campaign.entity';
import { CampaignPresenterDTO } from './presenters/campaign.presenter';
import { CampaignJourneyCosmosdbRepository } from './repositories/campaign-journey.cosmosb.repository';
import { CampaignService } from './services/campaign.service';

@Controller('campaign')
@UseGuards(FirebaseAuthGuard)
export class CampaignController {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    @Inject(CAMPAIGN_JOURNEY_REPOSITORY)
    private readonly campaignJourneyRepository: CampaignJourneyCosmosdbRepository,
    @Inject(CAMPAIGN_SERVICE)
    private readonly campaignService: CampaignService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @Get()
  async test(@User() user: IUserIdentity) {
    const shortcode =
      await this.campaignService.generateUniqueCampaignShortcode();
    console.log({ shortcode });

    const campaign = new CampaignDomain({
      campaignShortcode: shortcode,
      createdById: user.id,
      expiredAt: new Date(),
    });
    const campaignEntity = this.mapper.map(
      campaign,
      CampaignDomain,
      CampaignEntity,
    );

    console.log(
      `domain->entity: ${JSON.stringify(this.mapper.map(campaign, CampaignDomain, CampaignEntity))}`,
    );
    console.log(
      `entity->domain: ${JSON.stringify(this.mapper.map(campaignEntity, CampaignEntity, CampaignDomain))}`,
    );

    const result = await this.campaignRepository.save(campaignEntity);
    console.log(result);

    const data = await this.campaignRepository.findOne({
      where: { campaignShortcode: campaign.campaignShortcode },
    });
    if (!data) return;

    const dataDomain = this.mapper.map(data, CampaignEntity, CampaignDomain);

    console.log(
      `domain->presenter: ${JSON.stringify(this.mapper.map(dataDomain, CampaignDomain, CampaignPresenterDTO))}`,
    );
    console.log(
      `entity->presenter: ${JSON.stringify(this.mapper.map(data, CampaignEntity, CampaignPresenterDTO))}`,
    );

    const journey = new CampaignJourneyDomain({
      campaignShortcode: campaign.campaignShortcode,
      userId: user.id,
      location: { lat: 1, lng: -2, geoHash: 'abcdefgh' },
    });

    const journeyEntity = this.mapper.map(
      journey,
      CampaignJourneyDomain,
      CampaignJourneyCosmosdbEntity,
    );

    console.log(
      `domain->entity: ${JSON.stringify(this.mapper.map(journey, CampaignJourneyDomain, CampaignJourneyCosmosdbEntity))}`,
    );
    console.log(
      `entity->domain: ${JSON.stringify(this.mapper.map(journeyEntity, CampaignJourneyCosmosdbEntity, CampaignJourneyDomain))}`,
    );

    const journeyResult = await this.campaignJourneyRepository.create(journey);
    console.log(journeyResult);
  }
}
