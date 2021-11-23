import { Body, Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';;
import {createWriteStream} from 'fs';
// import UserService from './file.service';
import { CreateFileDto } from './file.dto';
import * as _ from 'lodash';

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(
    // private readonly userService: UserService
  ) {}

  @Post()
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
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() body: CreateFileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.warn(file)
    const ws = createWriteStream('uploadFiles/custom_filename.png')
    ws.write(file.buffer)
    const res = _.omit(file, 'buffer')
    return res;
  }

}
