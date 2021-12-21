import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_utc: number;

  @Column()
  filename: string;

  @Column()
  url: string;
}
