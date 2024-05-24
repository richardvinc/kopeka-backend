import { IsUUID } from 'class-validator';

export class GetReportByIdDTO {
  @IsUUID()
  id?: string;
}
