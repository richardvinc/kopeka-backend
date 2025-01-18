import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetReportsByUserIdDTO {
  @IsOptional()
  @Expose({ name: 'next_token' })
  nextToken?: string;

  userId: string;
}
