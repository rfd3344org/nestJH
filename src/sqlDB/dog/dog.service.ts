import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Dog } from './dog.model';
import { CreateDogDto } from './dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectModel(Dog)
    private dogModel: typeof Dog,
  ) {}

  async findAll(): Promise<Dog[]> {
    return await this.dogModel.findAll();
  }

  async create(model: CreateDogDto): Promise<any> {
    const res = await this.dogModel.create(model);
    return res[0];
  }

  async update(model: any): Promise<any> {
    const res = await this.dogModel.upsert(model);
    return res[0];
  }

  async delete(id): Promise<DeleteResult> {
    const res = await this.dogModel.destroy(id);
    return;
  }
}
