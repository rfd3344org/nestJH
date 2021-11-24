import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(
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
