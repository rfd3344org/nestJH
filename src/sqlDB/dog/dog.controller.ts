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

import { DogService } from './dog.service';
import { Dog } from './dog.model';
import { CreateDogDto } from './dog.dto';

@Controller('Dog')
@ApiTags('Dog (typeorm test)')
export class DogController {
  constructor(private service: DogService) {}

  @Get()
  index(): Promise<Dog[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() body: CreateDogDto): Promise<Dog> {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id, @Body() body: Dog): Promise<any> {
    return this.service.update({ id, ...body });
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.service.delete(id);
  }
}
