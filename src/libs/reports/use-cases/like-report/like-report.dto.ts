import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class LikeReportDTO {
  @IsUUID()
  readonly reportId: string;

  @IsBoolean()
  @IsOptional()
  readonly isLiked: boolean;

  readonly userId: string;
}
