import {
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class PostUserLocation {
  @IsString()
  @Length(6)
  campaignShortcode: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
