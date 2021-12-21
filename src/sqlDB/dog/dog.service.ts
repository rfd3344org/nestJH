import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Dog } from './dog.entity';
import { CreateDogDto } from './dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private dogRepo: Repository<Dog>,
  ) {}

  async findAll(): Promise<Dog[]> {
    return await this.dogRepo.find();
  }

  async create(entity: CreateDogDto): Promise<Dog> {
    return await this.dogRepo.save(entity);
  }

  async update(id, entity: Dog): Promise<UpdateResult> {
    const res = await this.dogRepo.update(id, entity);
    return res;
  }

  async delete(id): Promise<DeleteResult> {
    const res = await this.dogRepo.delete(id);
    return;
  }
}
