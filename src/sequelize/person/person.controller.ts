import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';

import { PersonService } from './person.service';
import { Person } from './person.model';
import { CreatePersonDto } from './person.dto';

@Controller('Person')
@ApiTags('Person')
export class PersonController {
  constructor(private service: PersonService) {}

  @Get()
  index(): Promise<Person[]> {
    return this.service.all();
  }

  @Post()
  async create(@Body() body: CreatePersonDto): Promise<Person> {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id, @Body() body: Person): Promise<any> {
    return this.service.update({ id, ...body });
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id): Promise<any> {
    return this.service.delete(id);
  }
}
