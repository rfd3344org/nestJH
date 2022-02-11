import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppConfigModule } from './config/appConfig.module';
import { TasksModule } from './job/tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { SqlDbModule } from './sequelize/SqlDbModule';
import { MongoModule } from './mongoDB/MongoModule';

import { AppController } from './app.controller';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    MailModule,
    TasksModule,
    AuthModule,

    SqlDbModule,
    MongoModule,
    // todo: use configService create service folder
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
  ],
  controllers: [AppController],
})
export class AppModule {}
