import { IsOptional, IsUUID } from 'class-validator';

export class GetReportByIdDTO {
  @IsUUID()
  reportId: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
