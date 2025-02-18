import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoModule } from 'src/libs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { CatsModule } from 'src/modules/cats/cats.module';
import { PostModule } from 'src/modules/post/post.module';

import { AppController } from './app.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule,
    AuthModule,
    UserModule,
    CatsModule,
    PostModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
