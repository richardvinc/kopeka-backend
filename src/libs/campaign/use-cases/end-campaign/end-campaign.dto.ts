import { IsUUID } from 'class-validator';

export class EndCampaignDTO {
  @IsUUID()
  campaignId: string;

  userId: string;
}
