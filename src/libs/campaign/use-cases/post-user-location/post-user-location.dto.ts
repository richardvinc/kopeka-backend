import { Expose } from 'class-transformer';
import { IsLatitude, IsLongitude, IsString, Length } from 'class-validator';

export class PostUserLocationDTO {
  @IsString()
  @Length(6)
  @Expose({ name: 'campaign_shortcode' })
  campaignShortcode: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  userId: string;
}
