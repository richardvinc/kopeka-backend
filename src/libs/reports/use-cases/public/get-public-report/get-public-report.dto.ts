import { IsLatitude, IsLongitude, IsOptional, IsString } from 'class-validator';

export class GetPublicReportDTO {
  @IsLatitude()
  @IsOptional()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  longitude?: number;

  @IsOptional()
  @IsString()
  categories?: string;

  @IsOptional()
  @IsString()
  conditions?: string;
}
