import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UUIDName } from '@/utils/orm.utils';

@Entity()
export class LensWizard extends UUIDName{
  @OneToMany((type) => Decision, (item) => item.wizard, {
    cascade: false,
  })
  decisions: Decision[];

  @OneToMany((type) => Step, (item) => item.wizard, {
    cascade: true,
    eager: true,
  })
  steps: Step[];

  // @PrimaryGeneratedColumn('uuid')
  // id: number;

  // @Column()
  // name: string;
}

@Entity()
export class Decision extends UUIDName {
  @Column()
  wizardId: number;
  @ManyToOne(() => LensWizard)
  wizard: LensWizard;

  @OneToMany(() => Choice, (item) => item.decision, {
    cascade: true,
  })
  choices: Choice[];

  // @PrimaryGeneratedColumn('uuid')
  // id: number;

  // @Column()
  // name: string;
}

@Entity()
export class Choice  extends UUIDName {
  @Column()
  decisionId: number;
  @ManyToOne(() => Decision)
  decision: Decision;

  // @PrimaryGeneratedColumn('uuid')
  // id: number;

  // @Column()
  // name: string;
}

@Entity()
export class Step extends UUIDName {
  @Column()
  wizardId: number;
  @ManyToOne(() => LensWizard)
  wizard: LensWizard;

  @Column()
  choiceId: number;
  @ManyToOne(() => Choice)
  choice: Choice;

  @Column({ nullable: true })
  parentId: number;

  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column()
  // name: string;

  @Column({ default: false })
  disabled: boolean;
}
