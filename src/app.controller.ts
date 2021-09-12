import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(

  ) {}

  @Get()
  async testRoute(): Promise<any> {

    return `<a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>`;
  }



}
