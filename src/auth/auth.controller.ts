import { Body, Controller, Request, Get, Post, UseGuards, Patch } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import UserService from '@/model/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginDto } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // @Post('sign-up')
  // create(@Body() createDto: SignUpDto) {
  //   return this.userService.create(createDto);
  // }

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

  @Post('change-password')
  @ApiBearerAuth()
  changePassword() {
    return `changePassword`;
  }

  @Post('forget-password')
  forgetPassword() {
    return `forgetPassword`;
  }




}
