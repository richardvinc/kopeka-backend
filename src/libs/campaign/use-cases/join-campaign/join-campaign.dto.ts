import { IsString, Length } from 'class-validator';

export class JoinCampaignDTO {
  @IsString()
  @Length(6)
  campaignShortcode: string;

  userId: string;
}
