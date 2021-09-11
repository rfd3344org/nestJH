import { Body, Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiBasicAuth,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import UserService from '@/user/user.service';
import { CreateUserDto } from '@/user/user.type';


@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }

  @Get()
  getAll() {
    return this.userService.find();
  }

}
