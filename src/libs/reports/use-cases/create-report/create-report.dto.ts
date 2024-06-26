import { Expose } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
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

  @IsString()
  @IsOptional()
  categoryRemark?: string;

  @IsOptional()
  @IsArray()
  subCategories?: string[];

  @IsString()
  @IsOptional()
  subCategoryRemark?: string;

  @IsEnum(Object.values(REPORT_CONDITION), {
    message: `condition must be one of these values: ${Object.values(
      REPORT_CONDITION,
    ).join(', ')}`,
  })
  condition: REPORT_CONDITION;

  @IsUUID()
  @IsOptional()
  @Expose({ name: 'campaign_id' })
  campaignId?: string;

  reportedById: string;
}
