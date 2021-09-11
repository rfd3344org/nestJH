import { Body, Controller, Request, Get, Post, Delete, Param, Query, UseGuards } from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiBasicAuth,
  ApiHeader,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import UserService from '@/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '@/user/user.type';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@/user/user.schema';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-up')
  create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }

  @Get('profile')
  profile() {
    return this.userService.find();
  }



  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto : LoginDto) {
    return this.authService.login(loginDto);
  }

  // updateUser

  // delete user


  @Get('all-users')
  getAll() {
    return this.userService.find();
  }

}
