import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

import {
  REPORT_CATEGORY,
  REPORT_CONDITION,
} from '@libs/reports/report.constant';

export class CreateReportDTO {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsUrl()
  @Expose({ name: 'image_url' })
  imageUrl: string;

  @IsEnum(Object.values(REPORT_CATEGORY), {
    message: `category must be one of these values: ${Object.values(
      REPORT_CATEGORY,
    ).join(', ')}`,
  })
  category: REPORT_CATEGORY;

  @IsEnum(Object.values(REPORT_CONDITION), {
    message: `condition must be one of these values: ${Object.values(
      REPORT_CONDITION,
    ).join(', ')}`,
  })
  condition: REPORT_CONDITION;

  @IsUUID()
  @IsOptional()
  campaignId?: string;

  reportedById: string;
}
