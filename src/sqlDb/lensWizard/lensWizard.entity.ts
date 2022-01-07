import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class LensWizard {
  @OneToMany((type) => Decision, (item) => item.wizard, {
    cascade: false,
  })
  decisions: Decision[];

  @OneToMany((type) => Step, (item) => item.wizard, {
    cascade: true,
    eager: true,
  })
  steps: Step[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity()
export class Decision {
  @Column()
  wizardId: number;
  @ManyToOne(() => LensWizard)
  wizard: LensWizard;

  @OneToMany(() => Choice, (item) => item.decision, {
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
  @Column()
  decisionId: number;
  @ManyToOne(() => Decision)
  decision: Decision;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}

@Entity()
export class Step {
  @Column()
  wizardId: number;
  @ManyToOne(() => LensWizard)
  wizard: LensWizard;

  @Column()
  choiceId: number;
  @ManyToOne(() => Choice)
  choice: Choice;


  @Column({nullable: true})
  parentId: number;


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  disabled: boolean;


}
