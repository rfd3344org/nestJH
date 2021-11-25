
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { FileEntity } from './file.entity';



@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private entityRepository: Repository<FileEntity>
  ) {}

  async findAll(): Promise<FileEntity[]> {
    return await this.entityRepository.find();
  }

  async create(entity: FileEntity): Promise<FileEntity> {
    return await this.entityRepository.save(entity);
  }

  async update(entity: FileEntity): Promise<UpdateResult> {
    return await this.entityRepository.update(entity.id, entity)
  }

  async delete(id): Promise<DeleteResult> {
    return await this.entityRepository.delete(id);
  }
}
