import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'src/auth/auth.module';
import UserModule from 'src/user/user.module';
import { CatsModule } from 'src/cats/cats.module';

import { AppController } from './app.controller';

const formatMongoURL = () => {
  const { MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD } = process.env;
  return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.lph5oow.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(formatMongoURL()),
    AuthModule,
    UserModule,
    CatsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
