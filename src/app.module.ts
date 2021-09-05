import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

const mongoDBUri = 'mongodb+srv://admin:admin@cluster0.giwpq.mongodb.net/nestDemo?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDBUri),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
