import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';


@Injectable()
export default class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createDto: CreateUserDto): Promise<any> {
    const nextCreateDto = {
      ...createDto,
      password: hashSync(createDto.password, 10),
      passPlain: createDto.password,
    };
    const createdUserModel = new this.userModel(nextCreateDto);
    console.warn('createdUser', createdUserModel)
    // return createdUserModel.save();
  }

  async findByUsername(username: string): Promise<any> {
    return this.userModel.findOne({ username }).lean();

  }


  async find(arg = null): Promise<User[]> {
    return this.userModel.find(arg).lean();
  }

}
