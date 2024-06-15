import { IsUUID } from 'class-validator';

export class JoinCampaignDTO {
  @IsUUID()
  campaignId: string;

  userId: string;
}
