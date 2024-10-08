import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateUsernameDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9._]{5,20}$/, {
    message:
      'Username must be between 5 and 20 characters and can only contain lowercase letters, numbers, dots and underscores',
  })
  username: string;

  @IsUrl()
  @Expose({ name: 'profile_picture_url' })
  profilePictureUrl: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'fcm_token' })
  fcmToken?: string;

  firebaseUid: string;
}
