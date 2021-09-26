import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Express } from 'express';

export class SampleDto {
  file: string;
}


@Controller()
export class AppController {
  constructor(

  ) {}

  @Get()
  async root(): Promise<any> {
    return `
      <a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>
    `;
  }


  @Get('test')
  async testRoute(): Promise<any> {
    await new Promise(resolve  => setTimeout(resolve , 1000));
    return `test`;
  }


  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      ...file,
      buffer: file.buffer.toString(),
    };
  }
}
