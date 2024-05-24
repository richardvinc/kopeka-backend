import { IsUUID } from 'class-validator';

export class GetUserByIdDTO {
  @IsUUID()
  id: string;
}
