import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner, OwnerDocument } from './schemas/owner.schema';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name) private readonly catModel: Model<OwnerDocument>,
  ) {}

  async create(createCatDto: CreateOwnerDto): Promise<Owner> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Owner[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: number): Promise<Owner> {
    return this.catModel.findById(id).exec();
  }
}
