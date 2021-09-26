import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './cat.dto';
import { Cat, CatDocument } from './cat.schema';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly model: Model<CatDocument>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.model(createCatDto);
    return createdCat.save();
  }

  async find(arg = null): Promise<Cat[]> {
    return this.model.find(arg).exec();
  }

  async findById(id: string): Promise<Cat> {
    return this.model.findById(id).exec();
  }

  async deleteOne(id: string): Promise<Cat> {
    return this.model.findOneAndDelete({_id: id}).exec();
  }

}
