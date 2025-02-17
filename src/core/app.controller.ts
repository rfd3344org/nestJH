import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(

  ) {}

  @Get()
  async root(): Promise<any> {

    return `<a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>`;
  }


  @Get('demo')
  async testRoute(): Promise<any> {

    return {
      message: 'Hello World!',
      test: 'This is a test route21222',
    };
  }
}
