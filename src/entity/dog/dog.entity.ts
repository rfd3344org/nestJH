import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    age: number;
}
