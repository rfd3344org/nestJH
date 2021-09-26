import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import UserModule from './model/user/user.module';
import { CatsModule } from './model/cat/cat.module';
import { AppController } from './app.controller';

const formatMongoURL = () => {
  const { MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD } = process.env;
  return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.giwpq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
};
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    MongooseModule.forRoot(formatMongoURL()),
    AuthModule,
    UserModule,
    CatsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
