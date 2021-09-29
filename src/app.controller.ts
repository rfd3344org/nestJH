import { Body, CACHE_MANAGER, Controller, Get, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

import { MailService } from '@/mail/mail.service';

export class SampleDto {
  file: string;
}


@Controller()
export class AppController {
  constructor(
    private mailService: MailService
  ) {}

  @Get()
  async root(): Promise<any> {
    return `
      <a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>
    `;
  }


  @Get('test')
  async test(): Promise<any> {
    await this.mailService.sendUserConfirmation();
    return `test`;
  }

  @Get('test2')
  async setTest(): Promise<any> {

    return `test2`;
  }


}
