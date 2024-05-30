import { Provider } from '@nestjs/common';

import { AzureStorageService } from './azure-storage.service';

export const AZURE_STORAGE_SERVICE = 'AZURE_STORAGE_SERVICE';

export const Services: Provider[] = [
  {
    provide: AZURE_STORAGE_SERVICE,
    useClass: AzureStorageService,
  },
];
