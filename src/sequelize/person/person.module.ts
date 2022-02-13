import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Person, Book} from './person.model';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [SequelizeModule.forFeature([Person, Book])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
