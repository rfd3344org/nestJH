import { Table, Column } from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

@Table({ tableName: 'dog' })
export class Dog extends BaseModel {
  @Column
  dogAge: number;
}
