import { IsUUID } from 'class-validator';

export class UnlikeReportDTO {
  @IsUUID()
  readonly reportId: string;

  readonly userId: string;
}
