import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class CreateCampaignDTO {
  @IsDate()
  @IsOptional()
  expiredAt?: Date;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
