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
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  name: string;
}

export const updateCascadeDB = async (
  repo,
  id,
  updatingQuery,
  relations = [],
) => {
  const entity = await repo.findOne(id, { relations });
  const nextEntity = {
    ...entity,
    ...updatingQuery,
  };
  return await repo.save(nextEntity);
};


export abstract class UUIDName {
  @Column
  id: string;

  @Column
  name: string;
}
