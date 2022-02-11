import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsModule } from './cat/cat.module';
import { UserModule } from './user/user.module';

import { AppConfigService } from '@/config/appConfig.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (config: AppConfigService) => {
        console.warn(config.mongoDBUri)
        return {
          uri: config.mongoDBUri,
        };
      },
      inject: [AppConfigService],
    }),
    CatsModule,
    UserModule,
  ],
})
export class MongoModule {}
