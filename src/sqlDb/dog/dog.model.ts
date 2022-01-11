import { Column,IsUUID, DataType, Default, PrimaryKey,  Model, Table } from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

@Table({  tableName: 'dog' })
export class Dog extends BaseModel {

  @Column
  dogAge: number;
}
