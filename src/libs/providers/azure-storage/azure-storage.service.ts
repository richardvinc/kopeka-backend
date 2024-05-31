import {
  BlobServiceClient,
  ContainerSASPermissions,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureStorageService {
  constructor(private readonly configService: ConfigService) {}

  private async getBlobServiceInstance() {
    const connectionString = this.configService.get(
      'STORAGE_ACCOUNT_CONNECTION_STRING',
    );
    const blobClientService =
      await BlobServiceClient.fromConnectionString(connectionString);

    return blobClientService;
  }

  public async generateSasUrl(containerName: string, blobName: string) {
    const blobService = await this.getBlobServiceInstance();
    const containerClient = blobService.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const sasToken = await blobClient.generateSasUrl({
      permissions: ContainerSASPermissions.parse('w'),
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 3600),
    });

    return sasToken;
  }

  public getStorageAccountName(): string {
    return this.configService.getOrThrow('STORAGE_ACCOUNT_NAME');
  }
}
