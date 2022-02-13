import {
  Table,
  Column,
  ForeignKey,
  HasMany,
  BelongsTo,
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
  @Column({ allowNull: true })
  parentId: string;

  @HasMany(() => Book, 'authorId')
  books: Book[];

  @HasMany(() => Book, 'proofreaderId')
  reads: Book[];
}

@Table({ tableName: 'book' })
export class Book extends BaseModel {
  @ForeignKey(() => Person)
  @Column
  authorId: string;


  @ForeignKey(() => Person)
  @Column
  proofreaderId: string;

}
