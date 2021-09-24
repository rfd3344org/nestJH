import { Body, Controller, Request, Get, Post, UseGuards, Patch } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import UserService from '@/models/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto, LoginDto } from '@/models/user/user.dto';

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
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  // updateUser


  // delete user


  @Get('all-users')
  getAll() {
    return this.userService.find();
  }

}
