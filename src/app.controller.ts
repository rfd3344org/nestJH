import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  async testRoute(): Promise<any> {

    return `<a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>`;
  }



}
