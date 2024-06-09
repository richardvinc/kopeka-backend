import { AutoMap } from '@automapper/classes';
import { CosmosPartitionKey, Point } from '@nestjs/azure-database';

@CosmosPartitionKey('campaignShortcode')
export class CampaignJourneyCosmosdbEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  campaignShortcode: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  location: Point;

  @AutoMap()
  createdAt: Date;
}
