import { Controller, Get, Post, Request, Redirect, UseGuards, Header } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  async testRoute(): Promise<any> {

    return `<a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.warn('getProfile', req.user)
    return req.user;
  }

}
