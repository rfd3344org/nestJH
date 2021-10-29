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
import { EntitiesModule } from './sqlite/sqlite.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    MongooseModule.forRoot(getMongoDBUri()),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
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
    EntitiesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
