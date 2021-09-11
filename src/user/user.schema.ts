import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  readonly email: string;

  @Prop()
  readonly username: string;

  @Prop()
  readonly password: string;

  @Prop()
  readonly passPlain: string;

  @Prop()
  readonly fullname: string;

  @Prop()
  readonly role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
