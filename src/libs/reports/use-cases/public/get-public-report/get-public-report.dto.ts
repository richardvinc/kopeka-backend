import { IsOptional, IsString } from 'class-validator';

export class GetPublicReportDTO {
  @IsOptional()
  geohash?: string;

  @IsOptional()
  @IsString()
  categories?: string;

  @IsOptional()
  @IsString()
  conditions?: string;
}
