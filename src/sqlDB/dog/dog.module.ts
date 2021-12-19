import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogEntity } from './dog.entity';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  providers: [DogService],
  controllers: [DogController],
})
export class DogModule {}
