import { Table, Column } from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

@Table({ tableName: 'person' })
export class Person extends BaseModel {
  @Column
  email : string;

  @Column
  contactNumber : string;

  // foreignKey
  @Column
  address: string;

}
