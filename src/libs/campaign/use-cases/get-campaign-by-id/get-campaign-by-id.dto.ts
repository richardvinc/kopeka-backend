import { IsUUID } from 'class-validator';

export class GetCampaignByIdDTO {
  @IsUUID()
  campaignId: string;
}
