import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
import { DogModule } from './dog/dog.module';
import { Dog } from './dog/dog.model';
import { FileModule } from './file/file.module';
import { LensWizardModule } from './lensWizard/lensWizard.module';

import { AppConfigService } from '@/config/appConfig.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (config: AppConfigService) => config.sqlDbConfig,
      inject: [AppConfigService],
    }),

    DogModule,
    // FileModule,
    // LensWizardModule,
  ],
})
export class SqlDbModule {}
