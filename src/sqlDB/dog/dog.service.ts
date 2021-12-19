import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { DogEntity } from './dog.entity';
import { CreateDogDto } from './dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(DogEntity)
    private entityRepository: Repository<DogEntity>
  ) { }

  async findAll(): Promise<DogEntity[]> {
    return await this.entityRepository.find();
  }

  async create(entity: CreateDogDto): Promise<DogEntity> {
    return await this.entityRepository.save(entity);
  }

  async update(entity: DogEntity): Promise<UpdateResult> {
    return await this.entityRepository.update(entity.id, entity)
  }

  async delete(id): Promise<DeleteResult> {
    return await this.entityRepository.delete(id);
  }
}
