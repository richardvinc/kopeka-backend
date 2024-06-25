import { Repository } from 'typeorm';

import { AppConfigService } from '@libs/config/app/app-config.service';
import { AZURE_STORAGE_SERVICE } from '@libs/providers/azure-storage';
import { AzureStorageService } from '@libs/providers/azure-storage/azure-storage.service';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CAMPAIGN_JOURNEY_REPOSITORY } from '../campaign.constant';
import { CampaignJourneyDomain } from '../domain/campaign-journey.domain';
import { CampaignEntity } from '../entities/campaign.entity';
import { CampaignJourneyCosmosdbRepository } from '../repositories/campaign-journey.cosmosb.repository';

@Injectable()
export class CampaignJourneyService {
  private containerName: string = 'campaign-journeys';
  private imageGeneratorFunctionUrl: string;

  constructor(
    @Inject(CAMPAIGN_JOURNEY_REPOSITORY)
    private readonly campaignJourneyRepository: CampaignJourneyCosmosdbRepository,
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    @Inject(AZURE_STORAGE_SERVICE)
    private readonly azureStorageService: AzureStorageService,
    private appConfigService: AppConfigService,
    private httpService: HttpService,
  ) {
    this.imageGeneratorFunctionUrl =
      this.appConfigService.imageGeneratorFunctionURL;
  }

  async postUserLocation(campaignJourney: CampaignJourneyDomain) {
    await this.campaignJourneyRepository.create(campaignJourney);
  }

  async generateMapImage(campaignId: string) {
    const filename = `${campaignId}.png`;

    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });
    if (!campaign) throw new Error('Campaign not found');

    // create POST request to image generator function URL
    this.httpService
      .post(`${this.imageGeneratorFunctionUrl}/${campaignId}`, {})
      .subscribe();

    // update campaign image URL
    const imageUrl = this.azureStorageService.getFileAccessURL(
      this.containerName,
      filename,
    );

    campaign.campaignImage = imageUrl;
    await this.campaignRepository.save(campaign);
  }
}
