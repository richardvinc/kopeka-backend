import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateCampaignDTO {
  @IsDate()
  @IsOptional()
  expiredAt?: Date;

  @IsString()
  @IsOptional()
  description: string;

  userId: string;
}
