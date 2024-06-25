import { AppConfigModule } from '@libs/config/app';
import { AzureStorageModule } from '@libs/providers/azure-storage/azure-storage.module';
import { UserModule } from '@libs/users/user.module';
import { HttpModule } from '@nestjs/axios';
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
import { EndCampaignUseCase } from './use-cases/end-campaign/end-campaign.use-case';
import { EndExpiredCampaignsUseCase } from './use-cases/end-expired-campaigns/end-expired-campaigns.use-case';
import { GetCampaignByIdUseCase } from './use-cases/get-campaign-by-id/get-campaign-by-id.use-case';
import { GetCampaignByShortcodeUseCase } from './use-cases/get-campaign-by-shortcode/get-campaign-by-shortcode.use-case';
import { GetPastUserCampaignsUseCase } from './use-cases/get-past-user-campaigns/get-past-user-campaigns.use-case';
import { JoinCampaignUseCase } from './use-cases/join-campaign/join-campaign.use-case';
import { LeaveCampaignUseCase } from './use-cases/leave-campaign/leave-campaign.use-case';
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
  GetCampaignByShortcodeUseCase,
  CreateCampaignUseCase,
  EndCampaignUseCase,
  JoinCampaignUseCase,
  LeaveCampaignUseCase,
  PostUserLocationUseCase,
  EndExpiredCampaignsUseCase,
  GetPastUserCampaignsUseCase,
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
    AppConfigModule,
    UserModule,
    AzureStorageModule,
    HttpModule,
  ],
  controllers: [CampaignController, CampaignJourneyController],
  providers: [...Repositories, ...Services, ...UseCases, CampaignMapperProfile],
  exports: [...Services],
})
export class CampaignModule {}
