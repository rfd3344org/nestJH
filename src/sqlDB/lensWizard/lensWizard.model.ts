import { Table, Column, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

@Table({ tableName: 'lens_wizard' })
export class LensWizard extends BaseModel {
  @HasMany((type) => Decision)
  decisions: Decision[];

  @HasMany(() => Step)
  steps: Step[];
}

@Table({ tableName: 'decision' })
export class Decision extends BaseModel {
  @ForeignKey(()=> LensWizard)
  @Column
  wizardId: number;

  @BelongsTo(() => LensWizard)
  wizard: LensWizard;

  @HasMany(() => Choice)
  choices: Choice[];
}

@Table({ tableName: 'choice' })
export class Choice extends BaseModel {
  @ForeignKey(()=> Decision)
  @Column
  decisionId: number;

  @BelongsTo(() => Decision)
  decision: Decision;
}

@Table({ tableName: 'step' })
export class Step extends BaseModel {
  @ForeignKey(()=> LensWizard)
  @Column
  wizardId: number;

  @BelongsTo(() => LensWizard)
  wizard: LensWizard;

  @ForeignKey(()=> Choice)
  @Column
  choiceId: number;

  @BelongsTo(() => Choice)
  choice: Choice;

  @Column
  // ({ nullable: true })
  parentId: number;


  @Column
  // ({ default: false })
  disabled: boolean;
}
