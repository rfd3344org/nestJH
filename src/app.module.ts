import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { OwnersModule } from './owners/owners.module';

const mongoDBUri = 'mongodb+srv://admin:admin@cluster0.giwpq.mongodb.net/nestDemo?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDBUri),
    CatsModule,
    OwnersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
