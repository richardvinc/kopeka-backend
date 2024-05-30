import { Module } from '@nestjs/common';

import { Services } from './';

@Module({
  providers: [...Services],
  exports: [...Services],
})
export class AzureStorageModule {}
