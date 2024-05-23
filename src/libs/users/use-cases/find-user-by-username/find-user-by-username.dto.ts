import { IsString } from 'class-validator';

export class FindUserByUsernameDTO {
  @IsString()
  username: string;
}
