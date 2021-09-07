import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Redirect('/docs')
  getHello(): any {
    // return 'go to page /api';
  }
}
