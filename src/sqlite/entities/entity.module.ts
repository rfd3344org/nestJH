import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from './entity.entity';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GenericEntity]),
  ],
  providers: [EntitiesService],
  controllers: [EntitiesController],
})
export class EntitiesModule {}
