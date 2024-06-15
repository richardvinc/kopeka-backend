import { IsUUID } from 'class-validator';

export class GetReportByIdDTO {
  @IsUUID()
  reportId: string;

  userId?: string;
}
