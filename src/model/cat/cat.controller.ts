import { Body, Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { CatsService } from './cat.service';
import { CreateCatDto } from './cat.dto';

@Controller('cat')
@ApiTags('cat')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.find();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '61349adbfeb0af352aa23199' })
  getById(@Param('id') id: string) {
    return this.catsService.findById(id);
  }



  @Post()
  @ApiOperation({ summary: `called ApiOperation` })
  @ApiHeader({ name: 'token' })
  @ApiQuery({ name: `ApiQuery`, example: `example` })
  @ApiQuery({ name: 'EnumDemo', enum: ['Admin', 'Moderator', 'User'] })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: string) {
    return this.catsService.deleteOne(id);
  }

  @Get('search')
  @ApiQuery({ name: 'name', example: 'cat', required: false })
  search(
    @Query('name') name: string,
    @Query('age') age: number,
  ) {
    const searchFields : any = {};
    if(name) searchFields.name = new RegExp(name, 'i');
    if(age) searchFields.age = age;

    return this.catsService.find(searchFields);
  }

}
