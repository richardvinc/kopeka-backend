import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsBoolean()
  @IsOptional()
  @Expose({ name: 'is_onboarded' })
  isOnboarded?: boolean;

  //   @IsBoolean()
  //   @IsOptional()
  //   @Expose({ name: 'is_active' })
  //   isActive?: boolean;

  @IsString()
  @IsOptional()
  @Expose({ name: 'fcm_token' })
  fcmToken?: string;

  userId: string;
}
