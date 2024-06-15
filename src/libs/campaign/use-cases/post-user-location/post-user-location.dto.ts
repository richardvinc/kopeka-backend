import { IsLatitude, IsLongitude, IsString, Length } from 'class-validator';

export class PostUserLocation {
  @IsString()
  @Length(6)
  campaignShortcode: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  userId: string;
}
