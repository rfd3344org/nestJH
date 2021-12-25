import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class LensWizard {
  @OneToMany((type) => Decision, (decision) => decision.wizard)
  decisions: Decision[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Decision {
  @ManyToOne(() => LensWizard, (lensWizard) => lensWizard.decisions)
  wizard: LensWizard;

  @OneToMany(() => Choice, (choice) => choice.decision, {
    cascade: true,
  })
  choices: Choice[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Choice {
  @ManyToOne(() => Decision, (decision) => decision.choices)
  decision: Decision;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
