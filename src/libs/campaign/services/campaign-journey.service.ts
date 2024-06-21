import osmsm from 'osm-static-maps';
import { Repository } from 'typeorm';

import { AZURE_STORAGE_SERVICE } from '@libs/providers/azure-storage';
import { AzureStorageService } from '@libs/providers/azure-storage/azure-storage.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CAMPAIGN_JOURNEY_REPOSITORY } from '../campaign.constant';
import { CampaignJourneyDomain } from '../domain/campaign-journey.domain';
import { CampaignEntity } from '../entities/campaign.entity';
import { CampaignJourneyCosmosdbRepository } from '../repositories/campaign-journey.cosmosb.repository';

@Injectable()
export class CampaignJourneyService {
  private containerName: string = 'campaign-journeys';
  private storageAccountName: string;

  constructor(
    @Inject(CAMPAIGN_JOURNEY_REPOSITORY)
    private readonly campaignJourneyRepository: CampaignJourneyCosmosdbRepository,
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    @Inject(AZURE_STORAGE_SERVICE)
    private readonly azureStorageService: AzureStorageService,
  ) {
    this.storageAccountName = this.azureStorageService.getStorageAccountName();
  }

  async postUserLocation(campaignJourney: CampaignJourneyDomain) {
    await this.campaignJourneyRepository.create(campaignJourney);
  }

  async generateMapJourney(campaignId: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });
    if (!campaign) throw new Error('Campaign not found');

    const journeys =
      await this.campaignJourneyRepository.findAllByCampaignId(campaignId);
    const locations: [number, number][] = journeys.map((journey) => [
      journey.location.longitude,
      journey.location.latitude,
    ]);

    if (locations.length === 0) return;

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
    // fs.writeFileSync(`./${campaignId}.png`, map);
    const filename = `${campaignId}.png`;
    await this.azureStorageService.uploadCampaignJourneyImageToAzure(
      this.containerName,
      filename,
      map,
    );

    // update campaign image URL
    const imageUrl = this.azureStorageService.getFileAccessURL(
      this.containerName,
      filename,
    );

    campaign.campaignImage = imageUrl;
    await this.campaignRepository.save(campaign);
  }
}
