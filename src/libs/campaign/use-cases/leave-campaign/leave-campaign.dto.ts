import { IsString, Length } from 'class-validator';

export class LeaveCampaignDTO {
  @IsString()
  @Length(6)
  campaignShortcode: string;

  userId: string;
}
