import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampaignJourneyController } from './campaign-journey.controller';
import {
  CAMPAIGN_JOURNEY_REPOSITORY,
  CAMPAIGN_JOURNEY_SERVICE,
  CAMPAIGN_JOURNEY_TABLE_NAME,
  CAMPAIGN_SERVICE,
} from './campaign.constant';
import { CampaignController } from './campaign.controller';
import { CampaignJourneyCosmosdbEntity } from './entities/campaign-journey.cosmosdb-entity';
import { CampaignMembershipEntity } from './entities/campaign-membership.entity';
import { CampaignEntity } from './entities/campaign.entity';
import { CampaignMapperProfile } from './mappers/campaign.mapper';
import { CampaignJourneyCosmosdbRepository } from './repositories/campaign-journey.cosmosb.repository';
import { CampaignJourneyService } from './services/campaign-journey.service';
import { CampaignService } from './services/campaign.service';
import { CreateCampaignUseCase } from './use-cases/create-campaign/create-campaign.use-case';
import { GetCampaignByIdUseCase } from './use-cases/get-campaign-by-id/get-campaign-by-id.use-case';
import { PostUserLocationUseCase } from './use-cases/post-user-location/post-user-location.use-case';

const Repositories: Provider[] = [
  {
    provide: CAMPAIGN_JOURNEY_REPOSITORY,
    useClass: CampaignJourneyCosmosdbRepository,
  },
];

const Services: Provider[] = [
  {
    provide: CAMPAIGN_SERVICE,
    useClass: CampaignService,
  },
  {
    provide: CAMPAIGN_JOURNEY_SERVICE,
    useClass: CampaignJourneyService,
  },
];

const UseCases = [
  GetCampaignByIdUseCase,
  CreateCampaignUseCase,
  PostUserLocationUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignEntity, CampaignMembershipEntity]),
    AzureCosmosDbModule.forFeature([
      {
        collection: CAMPAIGN_JOURNEY_TABLE_NAME,
        dto: CampaignJourneyCosmosdbEntity,
      },
    ]),
  ],
  controllers: [CampaignController, CampaignJourneyController],
  providers: [...Repositories, ...Services, ...UseCases, CampaignMapperProfile],
  exports: [...Services],
})
export class CampaignModule {}
