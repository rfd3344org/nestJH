import {
  Table,
  Column,
  ForeignKey,
  HasMany,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

@Table({ tableName: 'lens_wizard' })
export class LensWizard extends BaseModel {
  @HasMany((type) => Decision)
  decisions: Decision[];

  @HasMany(() => Step)
  steps: Step[];


  // @HasMany(() => Step)
  // get steps(): any {
  //   console.warn('steps')
  //   const steps = this.getDataValue('steps');
  //   return [steps[0]];
  //   // console.warn(this.get('steps'));
  //   // return 'My name is '
  // }
  // set steps(value: any) {
  //   console.warn('value', value)
  //   this.setDataValue('aaa', value);
  // }
}

@Table({ tableName: 'decision' })
export class Decision extends BaseModel {
  @ForeignKey(() => LensWizard)
  @Column
  wizardId: string;

  @BelongsTo(() => LensWizard)
  wizard: LensWizard;

  @HasMany(() => Choice)
  choices: Choice[];
}

@Table({ tableName: 'choice' })
export class Choice extends BaseModel {
  @ForeignKey(() => Decision)
  @Column
  decisionId: string;

  @BelongsTo(() => Decision)
  decision: Decision;
}

@Table({ tableName: 'step' })
export class Step extends BaseModel {
  @ForeignKey(() => LensWizard)
  @Column
  wizardId: string;

  @BelongsTo(() => LensWizard)
  wizard: LensWizard;

  @ForeignKey(() => Choice)
  @Column
  choiceId: string;

  @BelongsTo(() => Choice)
  choice: Choice;

  @ForeignKey(() => Step)
  @Column({ allowNull: true })
  parentId: string;


  @Default(false)
  @Column
  disabled: boolean;
}
