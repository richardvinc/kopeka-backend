import { IsString, Length } from 'class-validator';

export class LeaveCampaignDTO {
  @IsString()
  @Length(6)
  campaignshortcode: string;

  userId: string;
}
