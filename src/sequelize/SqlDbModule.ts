import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppConfigService } from '@/config/appConfig.service';

import { DogModule } from './dog/dog.module';
import { PersonModule } from './person/person.module';
import { FileModule } from './file/file.module';
import { LensWizardModule } from './lensWizard/lensWizard.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (config: AppConfigService) => config.sqlDbConfig,
      inject: [AppConfigService],
    }),

    DogModule,
    PersonModule,
    FileModule,
    LensWizardModule,
  ],
})
export class SqlDbModule {}
