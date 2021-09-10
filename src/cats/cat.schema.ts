import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Owner } from '../owners/schemas/owner.schema';

// import { CreateCatDto } from 'src/cats/cat.dto';

import { CreateCatDto } from '@/cats/cat.dto';
// import { CreateCatDto } from '@test/';
console.warn( 'CreateCatDto', CreateCatDto)

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;

}

export const CatSchema = SchemaFactory.createForClass(Cat);
