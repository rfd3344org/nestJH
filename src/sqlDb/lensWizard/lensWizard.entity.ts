import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class LensWizardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;



    @OneToMany((type) => DecisionEntity, (decision) => decision.wizard)
    decisions: DecisionEntity[];

    // @Column()
    // steps: string;
}




@Entity()
export class DecisionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wizard: string;

    @Column()
    name: string;

    // @Column()
    // steps: string;
}
