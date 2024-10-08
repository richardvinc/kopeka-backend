import { IsUUID } from 'class-validator';

export class LikeReportDTO {
  @IsUUID()
  readonly reportId: string;

  readonly userId: string;
}
