import { Expose } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class GetNearbyReportDTO {
  @IsString()
  @MaxLength(9)
  @IsOptional()
  @Expose({ name: 'geo_hash' })
  geoHash?: string;

  @IsOptional()
  @IsUUID()
  @Expose({ name: 'report_id' })
  reportId?: string;

  @IsLatitude()
  @IsOptional()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  longitude?: number;

  userId?: string;
}
