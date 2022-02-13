import {
  Column,
  IsUUID,
  DataType,
  Default,
  PrimaryKey,
  Model,
  Table,
} from 'sequelize-typescript';


@Table({ underscored: true })
export abstract class BaseModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  name: string;
}

export const includeAll: any = { include: [{ all: true }] };
