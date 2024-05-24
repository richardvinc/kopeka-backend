import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class GetLatestReportsDTO {
  @IsOptional()
  @Expose({ name: 'next_token' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  nextToken?: number;

  @IsUUID(4, { each: true })
  @IsOptional()
  excludedReportIds?: string[];

  @IsUUID()
  @IsOptional()
  userId: string;
}
