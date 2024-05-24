import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class GetNearbyReportDTO {
  @IsString()
  @MaxLength(7)
  @Expose({ name: 'geo_hash' })
  geoHash: string;

  @IsOptional()
  @IsUUID()
  @Expose({ name: 'report_id' })
  reportId?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
