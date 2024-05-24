import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9._]{5,20}$/, {
    message:
      'Username must be between 5 and 20 characters and can only contain lowercase letters, numbers, dots and underscores',
  })
  username: string;

  firebaseUid: string;

  @IsUrl()
  @Expose({ name: 'profile_picture_url' })
  profilePictureUrl: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'fcm_token' })
  fcmToken: string;
}
