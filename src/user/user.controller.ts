import { Body, Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiBasicAuth,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import UserService from './user.service';
import { CreateUserDto } from './user.type';


@Controller('user')
@ApiTags('user')
@ApiBasicAuth()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  getAll() {
    return this.userService.find();
  }

  // @Get('search')
  // @ApiQuery({ name: 'name', example: 'cat', required: false })
  // search(@Query('name') name: string) {
  //   const searchFields : any = {};
  //   if(name) searchFields.name = new RegExp(name, 'i');

  //   return this.userService.find(searchFields);
  // }

  // @Get(':id')
  // @ApiParam({ name: 'id', example: '61349adbfeb0af352aa23199' })
  // findById(@Param('id') id: string) {
  //   return this.userService.findById(id);
  // }

  // @Delete(':id')
  // @ApiParam({ name: 'id' })
  // deleteOne(@Param('id') id: string) {
  //   return this.userService.deleteOne(id);
  // }

}
