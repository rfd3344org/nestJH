// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Table, Column } from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

@Table({ tableName: 'file' })
export class File extends BaseModel {
  @Column
  filename: string;

  @Column
  path: string;

  @Column
  type: string;


}
