import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './dog.entity';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  providers: [DogService],
  controllers: [DogController],
})
export class DogModule {}
