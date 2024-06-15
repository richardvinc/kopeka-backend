import { IsUUID } from 'class-validator';

export class LeaveCampaignDTO {
  @IsUUID()
  campaignId: string;

  userId: string;
}
