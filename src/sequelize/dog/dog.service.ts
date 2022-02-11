import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dog } from './dog.model';
import { CreateDogDto } from './dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectModel(Dog)
    private dogModel: typeof Dog,
  ) {}

  async all(): Promise<Dog[]> {
    return await this.dogModel.findAll();
  }

  async create(model: any): Promise<any> {
    return await this.dogModel.create(model);
  }

  async update(model: any): Promise<any> {
    return await this.dogModel.upsert(model);
  }

  async delete(id: string): Promise<any> {
    return await this.dogModel.destroy({ where: { id } });
  }
}
