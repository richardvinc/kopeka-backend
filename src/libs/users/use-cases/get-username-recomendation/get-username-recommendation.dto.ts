import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetUsernameRecommendationDTO {
  @IsString({ each: true })
  @IsOptional()
  @Expose({ name: 'already_recommended_usernames' })
  alreadyRecommendedUsernames?: string[];
}
