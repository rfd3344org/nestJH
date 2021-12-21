import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class LensWizard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Decision, (decision) => decision.wizard)
  decisions: Decision[];

  // @Column()
  // steps: string;
}

@Entity()
export class Decision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wizard: string;

  @Column()
  name: string;

  // @Column()
  // steps: string;
}
