import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { GPSLocation } from '@libs/reports/domains/report.domain';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CAMPAIGN_JOURNEY_REPOSITORY,
  CAMPAIGN_JOURNEY_SERVICE,
  CAMPAIGN_SERVICE,
} from './campaign.constant';
import { CampaignJourneyDomain } from './domain/campaign-journey.domain';
import { CampaignDomain } from './domain/campaign.domain';
import { CampaignEntity } from './entities/campaign.entity';
import { CampaignJourneyCosmosdbRepository } from './repositories/campaign-journey.cosmosb.repository';
import { CampaignJourneyService } from './services/campaign-journey.service';
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
    @Inject(CAMPAIGN_JOURNEY_SERVICE)
    private readonly campaignJourneyService: CampaignJourneyService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @Get()
  async test(@User() user: IUserIdentity) {
    const shortcode =
      await this.campaignService.generateUniqueCampaignShortcode();

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

    await this.campaignRepository.save(campaignEntity);

    const locations: GPSLocation[] = [
      { latitude: -6.294428, longitude: 106.634762, geoHash: 'aaaaaaa' },
      { latitude: -6.295111, longitude: 106.635663, geoHash: 'aaaaaaa' },
      { latitude: -6.293234, longitude: 106.635792, geoHash: 'aaaaaaa' },
      { latitude: -6.292274, longitude: 106.635341, geoHash: 'aaaaaaa' },
      { latitude: -6.292786, longitude: 106.637058, geoHash: 'aaaaaaa' },
      { latitude: -6.293191, longitude: 106.638066, geoHash: 'aaaaaaa' },
      { latitude: -6.294577, longitude: 106.637766, geoHash: 'aaaaaaa' },
      { latitude: -6.295942, longitude: 106.637508, geoHash: 'aaaaaaa' },
      { latitude: -6.297052, longitude: 106.637916, geoHash: 'aaaaaaa' },
      { latitude: -6.297734, longitude: 106.639482, geoHash: 'aaaaaaa' },
      { latitude: -6.298289, longitude: 106.640555, geoHash: 'aaaaaaa' },
      { latitude: -6.29863, longitude: 106.641757, geoHash: 'aaaaaaa' },
      { latitude: -6.298736, longitude: 106.643753, geoHash: 'aaaaaaa' },
    ];

    for (const location of locations) {
      const journey = new CampaignJourneyDomain({
        campaignShortcode: campaign.campaignShortcode,
        userId: user.id,
        location,
      });

      const journeyResult =
        await this.campaignJourneyRepository.create(journey);
      console.log(journeyResult);
    }
  }

  @Get('journey')
  async journey() {
    await this.campaignJourneyService.generateMapJourney('vbzi7b');
  }
}
