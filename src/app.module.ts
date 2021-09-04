import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

const mongoDBUri = 'mongodb+srv://admin:admin@cluster0.giwpq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(mongoDBUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
