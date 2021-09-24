import { Body, Controller, Get, Post, Delete, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';

import { RolesGuard } from '@/auth/auth.guard';
import UserService from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
@UseGuards(RolesGuard)
@ApiTags('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

}
