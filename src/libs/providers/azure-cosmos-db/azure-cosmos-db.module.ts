import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

const dbModule = AzureCosmosDbModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      dbName: configService.getOrThrow<string>('AZURE_COSMOS_DB_NAME'),
      endpoint: configService.getOrThrow<string>('AZURE_COSMOS_DB_ENDPOINT'),
      key: configService.getOrThrow<string>('AZURE_COSMOS_DB_KEY'),
    };
  },
});

@Module({
  imports: [ConfigModule, dbModule],
  providers: [],
  exports: [dbModule],
})
export class AzureCosmosDBConfigModule {}
