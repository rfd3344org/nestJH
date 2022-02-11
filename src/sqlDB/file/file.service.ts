import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Repository } from 'typeorm';
// import { UpdateResult, DeleteResult } from 'typeorm';

import * as _ from 'lodash';
import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';

import { File } from './file.model';
import { AppConfigService } from '@/config/appConfig.service';
import { CreateFileDto } from './file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File)
    private entityRepository: typeof File,
    private configService: AppConfigService,
  ) {}

  async findAll(): Promise<any> {
    return await this.entityRepository.findAll();
  }

  async create(filePath: any): Promise<File> {
    console.warn({
      created_utc: Date.now(),
      ...filePath,
    });
    return await this.entityRepository.create({
      created_utc: Date.now(),
      ...filePath,
    });
  }

  async update(entity: any): Promise<any> {
    return await this.entityRepository.upsert(entity);
  }

  async delete(id: string): Promise<any> {
    return await this.entityRepository.destroy({ where: { id } });
  }

  async saveFile(file: Express.Multer.File) {
    const { path } = await this.saveFile2Local(file.buffer, file.originalname);
    return this.create({
      filename: file.originalname,
      url: path,
    });
  }

  async saveFile2Local(buffer: Buffer, originalName: string): Promise<any> {
    const fileFolder = this.configService.get('FILE_PATH');

    const filename = `${uuid()}_${originalName}`;
    const path = `${fileFolder}/${filename}`;
    const ws = createWriteStream(path);
    ws.write(buffer);
    return {
      filename,
      path,
    };
  }
}
