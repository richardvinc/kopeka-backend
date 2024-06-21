import { Expose } from 'class-transformer';
import { IsLatitude, IsLongitude, IsUUID } from 'class-validator';

export class PostUserLocationDTO {
  @IsUUID()
  @Expose({ name: 'campaign_id' })
  campaignId: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  userId: string;
}
