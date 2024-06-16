import { IsUUID } from 'class-validator';

export class GetReportsByCampaignIdDTO {
  @IsUUID()
  campaignId: string;

  userId: string;
}
