import { DatabaseConfigService } from '@libs/config/database/database-config.service';
import { DatabaseConfigModule } from '@libs/config/database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (configService: DatabaseConfigService) => ({
        type: 'postgres',
        url: configService.pgDatabaseUrl,
        synchronize: false,
        autoLoadEntities: true,
        logging: true,
        useUTC: true,
        ssl: process.env.NODE_ENV === 'local' ? false : true,
      }),
      inject: [DatabaseConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
