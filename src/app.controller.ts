import { Body, CACHE_MANAGER, Controller, Get, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MailService } from '@/mail/mail.service';

export class SampleDto {
  file: string;
}


@Controller()
export class AppController {
  constructor(
    private mailService: MailService,
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  async root(): Promise<any> {
    return `
      <a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>
    `;
  }


  @Get('test')
  async test(): Promise<any> {
    // return this.client.emit('math:wordcount', '1111');
    const a = await this.client.send('math:wordcount', 'text');
    console.warn('a', a.subscribe)
    const b = await a.forEach(next => {
      console.warn('next', next)
    }) ;
    // await this.mailService.sendUserConfirmation();
    // console.warn('b', b)
    return `test ${a}`;
  }

  @Get('test2')
  async setTest(): Promise<any> {

    return `test2`;
  }


}
