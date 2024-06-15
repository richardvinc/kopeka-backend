import { IsDate, IsOptional } from 'class-validator';

export class CreateCampaignDTO {
  @IsDate()
  @IsOptional()
  expiredAt?: Date;

  userId: string;
}
