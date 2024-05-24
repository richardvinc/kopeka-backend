import { Expose } from 'class-transformer';
import { IsEnum, IsLatitude, IsLongitude, IsUrl } from 'class-validator';

import { REPORT_CATEGORY, REPORT_CONDITION } from '../report.constant';

export class CreateReportDTO {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lon: number;

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

  reportedById: string;
}
