import { randomUUID } from 'crypto';

import { REPORT_IMAGE_STORAGE_SERVICE } from '@libs/reports/report.constant';
import { ReportImageStorageService } from '@libs/reports/services/report-image-storage.service';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { Inject } from '@nestjs/common';

import { GetImageUploadUrlDTO } from './get-image-upload-url.dto';

export interface ImageSASResult {
  sasToken: string;
  accessUrl: string;
}

export class GetImageUploadUrlUseCase extends BaseUseCase<
  GetImageUploadUrlDTO,
  ImageSASResult
> {
  constructor(
    @Inject(REPORT_IMAGE_STORAGE_SERVICE)
    private readonly reportImageStorageService: ReportImageStorageService,
  ) {
    super();
  }

  async execute(dto: GetImageUploadUrlDTO): Promise<ImageSASResult> {
    const fileName = `${Date.now()}_${randomUUID()}_${dto.mimeType.split('/')[1]}`;

    const sasToken =
      await this.reportImageStorageService.generateSasToken(fileName);
    const accessUrl =
      await this.reportImageStorageService.generateAccessURL(fileName);

    return {
      sasToken,
      accessUrl,
    };
  }
}
