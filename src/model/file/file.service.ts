// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { hashSync, compareSync } from 'bcrypt';
// import { User, UserDocument } from './user.schema';
// import { CreateUserDto, UpdateUserDto } from './user.dto';

// @Injectable()
// export default class UserService {
//   constructor(
//     @InjectModel(User.name) private readonly model: Model<UserDocument>,
//   ) {}

//   async find(arg = null): Promise<User[]> {
//     return this.model.find(arg);
//   }

//   async findById(id: string): Promise<any> {
//     return this.model.findById(id);
//   }

//   async findByUsername(username: string): Promise<any> {
//     return this.model.findOne({ username }).lean();
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
//     return this.model.findByIdAndUpdate(id, updateUserDto);
//   }

//   async create(createDto: CreateUserDto): Promise<any> {
//     const nextCreateDto = {
//       ...createDto,
//       password: hashSync(createDto.password, 10),
//       passPlain: createDto.password,
//     };
//     const createdUserModel = new this.model(nextCreateDto);
//     return createdUserModel.save();
//   }

//   async deleteOne(id: string): Promise<User> {
//     return this.model.findByIdAndDelete(id).exec();
//   }

// }
