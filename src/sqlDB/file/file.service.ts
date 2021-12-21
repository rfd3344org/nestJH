import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

import * as _ from 'lodash';
import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';

import { File } from './file.entity';
import { AppConfigService } from '@/config/appConfig.service';
import { CreateFileDto } from './file.dto';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private entityRepository: Repository<File>,
    private configService: AppConfigService,
  ) {}

  async findAll(): Promise<File[]> {
    return await this.entityRepository.find();
  }

  async create(filePath: CreateFileDto): Promise<File> {
    console.warn({
      created_utc: Date.now(),
      ...filePath
    })
    return await this.entityRepository.save({
      created_utc: Date.now(),
      ...filePath
    });
  }

  async update(entity: File): Promise<UpdateResult> {
    return await this.entityRepository.update(entity.id, entity);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.entityRepository.delete(id);
  }

  async saveFile(file: Express.Multer.File) {
    const { path } = await this.saveFile2Local(file.buffer, file.originalname);
    return this.create({
      filename: file.originalname,
      url: path,
    });
  }

  async saveFile2Local(
    buffer: Buffer,
    originalName: string,
  ): Promise<any> {
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
