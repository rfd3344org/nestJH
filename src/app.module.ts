import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { TasksModule } from './job/tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import UserModule from './model/user/user.module';
import { CatsModule } from './model/cat/cat.module';
import { AppController } from './app.controller';
import { MailModule } from './mail/mail.module';
import { getMongoDBUri } from './utils/mongoDB.utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    MongooseModule.forRoot(getMongoDBUri()),
    ScheduleModule.forRoot(),
    MailModule,
    TasksModule,
    AuthModule,
    UserModule,
    CatsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
