import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dog } from './dog.model';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';

@Module({
  imports: [SequelizeModule.forFeature([Dog])],
  providers: [DogService],
  controllers: [DogController],
})
export class DogModule {}
