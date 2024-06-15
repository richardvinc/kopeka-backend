import fs from 'fs';
import osmsm from 'osm-static-maps';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { CAMPAIGN_JOURNEY_REPOSITORY } from '../campaign.constant';
import { CampaignJourneyDomain } from '../domain/campaign-journey.domain';
import { CampaignJourneyCosmosdbRepository } from '../repositories/campaign-journey.cosmosb.repository';

@Injectable()
export class CampaignJourneyService {
  constructor(
    @Inject(CAMPAIGN_JOURNEY_REPOSITORY)
    private readonly campaignJourneyRepository: CampaignJourneyCosmosdbRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async postUserLocation(campaignJourney: CampaignJourneyDomain) {
    await this.campaignJourneyRepository.create(campaignJourney);
  }

  async generateMapJourney(campaignShortcode: string) {
    const journeys =
      await this.campaignJourneyRepository.findAllByShortcode(
        campaignShortcode,
      );
    const locations: [number, number][] = journeys.map((journey) => [
      journey.location.longitude,
      journey.location.latitude,
    ]);

    const map = await osmsm({
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: locations,
              type: 'LineString',
            },
            id: 0,
          },
        ],
      },
    });

    // save buffer as image
    fs.writeFileSync(`./${campaignShortcode}.png`, map);
  }
}
