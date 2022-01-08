import {
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';


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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

}