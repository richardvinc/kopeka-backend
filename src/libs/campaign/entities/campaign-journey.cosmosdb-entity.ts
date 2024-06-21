import { AutoMap } from '@automapper/classes';
import {
  CosmosDateTime,
  CosmosPartitionKey,
  Point,
} from '@nestjs/azure-database';

@CosmosPartitionKey('campaignId')
export class CampaignJourneyCosmosdbEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  campaignId: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  location: Point;

  @AutoMap()
  @CosmosDateTime()
  createdAt: Date;
}
