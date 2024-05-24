import { IsOptional, IsUUID } from 'class-validator';

export class LikeReportDTO {
  @IsUUID()
  readonly reportId: string;

  @IsUUID()
  @IsOptional()
  readonly userId: string;
}
