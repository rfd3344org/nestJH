import { Body, Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import UserService from '@/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto, LoginDto } from '@/user/user.type';

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


  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto : LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    console.warn('getProfile', req.user)
    return req.user;
  }

  // updateUser

  // delete user


  @Get('all-users')
  getAll() {
    return this.userService.find();
  }

}
