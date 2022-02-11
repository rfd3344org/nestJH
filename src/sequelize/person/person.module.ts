import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Person } from './person.model';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
