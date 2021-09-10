import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { OwnersModule } from './owners/owners.module';
import { AppController } from './app.controller';

const formatMongoURL = () => {
  const { MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD } = process.env;
  return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.giwpq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(formatMongoURL()),
    AuthModule,
    UsersModule,
    CatsModule,
    OwnersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
