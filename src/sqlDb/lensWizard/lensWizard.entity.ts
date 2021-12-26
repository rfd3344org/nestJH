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

  @OneToMany((type) => Step, (step) => step.wizard, {
    cascade: true,
  })
  steps: Step[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Decision {
  @ManyToOne(() => LensWizard, 'id', {
    eager: true,
  })
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



@Entity()
export class Step {
  @ManyToOne(() => LensWizard, (lensWizard) => lensWizard.steps)
  wizard: LensWizard;

  // @ManyToOne(() => Choice)
  // choice: Choice;

  // @ManyToOne(type => Step, step => step.children)
  // parent: Step;

  // @OneToMany(type => Step, step => step.parent)
  // children: Step[];

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  disabled: boolean;

}
