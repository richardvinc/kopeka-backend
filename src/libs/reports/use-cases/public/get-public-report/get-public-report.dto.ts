import { IsLatitude, IsLongitude, IsOptional } from 'class-validator';

export class GetPublicReportDTO {
  @IsLatitude()
  @IsOptional()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  longitude?: number;
}
