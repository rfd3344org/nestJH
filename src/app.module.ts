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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SQLiteModule } from './sqlite/sqlite.module';

import { AppConfigService } from './config/config.service';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      // useFactory: async (configService: ConfigService) => {
      //   console.warn('rfd useFactory',  configService.get('MONGO_DB_NAME'))
      //   // return {uri: configService.env }
      // },
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoDBUri(),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(getMongoDBUri()),
    SQLiteModule,
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis-12354.c291.ap-southeast-2-1.ec2.cloud.redislabs.com',
          port: 12354,
          password: 'xTUcdIY2OMcyHya55BCBsXWJbbXwJNJ6',
        },
      },
    ]),
    MailModule,
    TasksModule,
    AuthModule,
    UserModule,
    CatsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
