import { AZURE_STORAGE_SERVICE } from '@libs/providers/azure-storage';
import { AzureStorageService } from '@libs/providers/azure-storage/azure-storage.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ReportImageStorageService {
  containerName: string = 'reports';
  storageAccountName: string;

  constructor(
    @Inject(AZURE_STORAGE_SERVICE)
    private readonly azureStorageService: AzureStorageService,
  ) {
    this.storageAccountName = this.azureStorageService.getStorageAccountName();
  }

  async generateSasUrl(fileName: string): Promise<string> {
    const sasUrl = await this.azureStorageService.generateSasUrl(
      this.containerName,
      fileName,
    );
    return sasUrl;
  }

  async generateAccessURL(fileName: string): Promise<string> {
    return this.azureStorageService.getFileAccessURL(
      this.containerName,
      fileName,
    );
  }
}
