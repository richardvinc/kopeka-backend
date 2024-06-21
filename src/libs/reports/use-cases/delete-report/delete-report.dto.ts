import { IsUUID } from 'class-validator';

export class DeleteReportDTO {
  @IsUUID()
  reportId: string;

  userId: string;
}
