import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetUserByUsernameDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9._]{5,20}$/, {
    message:
      'Username must be between 5 and 20 characters and can only contain lowercase letters, numbers, dots and underscores',
  })
  username: string;
}
