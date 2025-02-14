import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  readonly email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  passPlain: string;

  @Prop()
  fullname: string;

  @Prop()
  readonly role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
