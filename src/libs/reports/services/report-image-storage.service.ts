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

  async generateSasToken(fileName: string): Promise<string> {
    const sasToken = await this.azureStorageService.generateSasToken(
      this.containerName,
      fileName,
    );
    return sasToken;
  }

  async generateAccessURL(fileName: string): Promise<string> {
    return `https://${this.storageAccountName}.blob.core.windows.net/reports/${fileName}`;
  }
}
