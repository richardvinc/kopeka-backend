import { IsString, Length } from 'class-validator';

export class GetCampaignByShortcodeDTO {
  @IsString()
  @Length(6)
  campaignShortcode: string;
}
