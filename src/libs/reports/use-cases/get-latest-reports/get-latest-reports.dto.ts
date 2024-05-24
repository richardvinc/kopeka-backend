import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class GetLatestReportsDTO {
  @IsOptional()
  @Expose({ name: 'next_token' })
  nextToken?: string;

  @IsUUID(4, { each: true })
  @IsOptional()
  excludedReportIds?: string[];

  @IsUUID()
  @IsOptional()
  userId: string;
}
