import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'firebase_uid' })
  firebaseUid: string;

  @IsUrl()
  @Expose({ name: 'profile_picture_url' })
  profilePictureUrl: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'fcm_token' })
  fcmToken: string;
}
