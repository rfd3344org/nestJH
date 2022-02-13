import {
  Table,
  Column,
  ForeignKey,
  HasMany,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

// sellfJoin
// mutli relation

@Table({ tableName: 'person' })
export class Person extends BaseModel {
  @Column
  email: string;

  @Column
  contactNumber: string;

  @Column
  address: string;

  @ForeignKey(() => Person)
  @Column
  parentId: string;
}

@Table({ tableName: 'book' })
export class Book extends BaseModel {
  @ForeignKey(() => Person)
  @Column
  authorId: string;

  @BelongsTo(() => Person)
  author: Person;

  @ForeignKey(() => Person)
  @Column
  proofreaderId: string;

  @BelongsTo(() => Person)
  proofreader: Person;
}
