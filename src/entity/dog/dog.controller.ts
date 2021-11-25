import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { DogService } from './dog.service';
import { DogEntity } from './dog.entity';
import { CreateDogDto } from './dog.dto';

@Controller('dog')
@ApiTags('dog')
export class DogController {
  constructor(private service: DogService) {}

  @Get()
  index(): Promise<DogEntity[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() entitytData: CreateDogDto): Promise<any> {
    return this.service.create(entitytData);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id, @Body() entityData: DogEntity): Promise<any> {
      entityData.id = Number(id);
      return this.service.update(entityData);
  }

  @Delete(':id')
    async delete(@Param('id') id): Promise<any> {
      return this.service.delete(id);
  }
}
