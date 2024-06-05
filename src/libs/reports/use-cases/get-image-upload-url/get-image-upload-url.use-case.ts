import { randomUUID } from 'crypto';

import { REPORT_IMAGE_STORAGE_SERVICE } from '@libs/reports/report.constant';
import { ReportImageStorageService } from '@libs/reports/services/report-image-storage.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject, Logger } from '@nestjs/common';

import { GetImageUploadUrlDTO } from './get-image-upload-url.dto';

export interface ImageSASResult {
  sas_url: string;
  access_url: string;
}

export class GetImageUploadUrlUseCase extends BaseUseCase<
  GetImageUploadUrlDTO,
  ImageSASResult
> {
  private readonly logger = new Logger(GetImageUploadUrlUseCase.name);

  constructor(
    @Inject(REPORT_IMAGE_STORAGE_SERVICE)
    private readonly reportImageStorageService: ReportImageStorageService,
  ) {
    super();
  }

  async execute(dto: GetImageUploadUrlDTO): Promise<ImageSASResult> {
    this.logger.log(`START: execute`);
    this.logger.log(`dto: ${JSON.stringify(dto)}`);

    const fileName = `${Date.now()}_${randomUUID()}.${dto.mimeType.split('/')[1]}`;

    const sasUrl =
      await this.reportImageStorageService.generateSasUrl(fileName);
    const accessUrl =
      await this.reportImageStorageService.generateAccessURL(fileName);

    this.logger.log(`END: execute`);
    return {
      sas_url: sasUrl,
      access_url: accessUrl,
    };
  }
}
