import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { FileService } from './file.service';
import { CreateFileDto } from './file.dto';
import * as _ from 'lodash';

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly service: FileService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

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
  create(@UploadedFile() file: Express.Multer.File) {
    return this.service.saveFile(file);
  }

  @Delete(':id')
  @ApiParam({ name: 'id'})
  async delete(@Param('id') id): Promise<any> {
    return this.service.delete(id);
  }
}
