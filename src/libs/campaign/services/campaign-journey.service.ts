import { Repository } from 'typeorm';

import { AppConfigService } from '@libs/config/app/app-config.service';
import { AZURE_STORAGE_SERVICE } from '@libs/providers/azure-storage';
import { AzureStorageService } from '@libs/providers/azure-storage/azure-storage.service';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CAMPAIGN_JOURNEY_REPOSITORY } from '../campaign.constant';
import { CampaignJourneyDomain } from '../domain/campaign-journey.domain';
import { CampaignEntity } from '../entities/campaign.entity';
import { CampaignJourneyCosmosdbRepository } from '../repositories/campaign-journey.cosmosb.repository';

@Injectable()
export class CampaignJourneyService {
  private readonly logger = new Logger(CampaignJourneyService.name);
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
    this.logger.log(`START: postUserLocation`);
    this.logger.log(
      `Post user location to campaign journey ${JSON.stringify(campaignJourney)}`,
    );
    await this.campaignJourneyRepository.create(campaignJourney);
    this.logger.log(`END: postUserLocation`);
  }

  async generateMapImage(campaignId: string) {
    this.logger.log(`START: generateMapImage`);

    const filename = `${campaignId}.png`;

    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });
    if (!campaign) throw new Error('Campaign not found');

    // create POST request to image generator function URL
    // this.httpService
    //   .post(`${this.imageGeneratorFunctionUrl}/${campaignId}`, {})
    //   .subscribe({
    //     next: () => {
    //       this.logger.log('Map image generated successfully');
    //     },
    //     error: (err) => {
    //       this.logger.error(err);
    //       throw new Error('Failed to generate map image');
    //     },
    //   });

    // update campaign image URL
    const imageUrl = this.azureStorageService.getFileAccessURL(
      this.containerName,
      filename,
    );

    campaign.campaignImage = imageUrl;
    await this.campaignRepository.save(campaign);
    this.logger.log(`END: generateMapImage`);
  }
}
