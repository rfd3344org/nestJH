import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class LensWizard {
  @OneToMany((type) => Decision, (decision) => decision.wizard, {
    cascade: false,
  })
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
    // onDelete: 'CASCADE',
    // onUpdate: 'CASCADE',
  })
  public choices: Choice[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Choice {
  @ManyToOne(() => Decision, (decision) => decision.choices)
  public decision: Decision;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Step {


  // @ManyToOne(() => Choice)
  // choice: Choice;

  @Column()
  public choiceId: number;

  @Column()
  wizardId: number;
  @ManyToOne(() => LensWizard)
  wizard: LensWizard;

  @ManyToOne((type) => Step, (step) => step.children)
  parent: Step;

  @OneToMany((type) => Step, (step) => step.parent)
  children: Step[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  disabled: boolean;


}
