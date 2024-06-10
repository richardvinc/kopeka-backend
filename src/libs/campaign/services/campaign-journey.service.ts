import fs from 'fs';
import osmsm from 'osm-static-maps';

import { Inject, Injectable } from '@nestjs/common';

import { CAMPAIGN_JOURNEY_REPOSITORY } from '../campaign.constant';
import { CampaignJourneyCosmosdbRepository } from '../repositories/campaign-journey.cosmosb.repository';

@Injectable()
export class CampaignJourneyService {
  constructor(
    @Inject(CAMPAIGN_JOURNEY_REPOSITORY)
    private readonly campaignJourneyRepository: CampaignJourneyCosmosdbRepository,
  ) {}

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
