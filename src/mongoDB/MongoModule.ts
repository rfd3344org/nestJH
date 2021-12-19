import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsModule } from './cat/cat.module';
import { UserModule } from './user/user.module';

import { AppConfigService } from '@/config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: AppConfigService) => ({
        uri: configService.mongoDBUri,
      }),
      inject: [AppConfigService],
    }),
    CatsModule,
    UserModule,
  ],
})
export class MongoModule {}
