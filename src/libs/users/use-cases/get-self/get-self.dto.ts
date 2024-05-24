import { IsString } from 'class-validator';

export class GetSelfDTO {
  @IsString()
  firebaseUid: string;
}
