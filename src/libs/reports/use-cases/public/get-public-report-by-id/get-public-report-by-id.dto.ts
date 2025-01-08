import { IsUUID } from 'class-validator';

export class GetPublicReportByIdDTO {
  @IsUUID()
  reportId: string;
}
