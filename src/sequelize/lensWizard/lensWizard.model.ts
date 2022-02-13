import {
  Table,
  Column,
  ForeignKey,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { BaseModel } from '@/utils/orm.utils';

@Table({ tableName: 'lens_wizard' })
export class LensWizard extends BaseModel {
  @HasMany(() => Decision)
  decisions: Decision[];

  @HasMany(() => Step)
  steps: Step[];
}

@Table({ tableName: 'decision' })
export class Decision extends BaseModel {
  @ForeignKey(() => LensWizard)
  @Column
  wizardId: string;

  @HasMany(() => Choice)
  choices: Choice[];
}

@Table({ tableName: 'choice' })
export class Choice extends BaseModel {

  @ForeignKey(() => Decision)
  @Column
  decisionId: string;
}

@Table({ tableName: 'step' })
export class Step extends BaseModel {
  @ForeignKey(() => LensWizard)
  @Column
  wizardId: string;

  @ForeignKey(() => Choice)
  @Column
  choiceId: string;

  @ForeignKey(() => Step)
  @Column({ allowNull: true })
  parentId: string;

  @Default(false)
  @Column
  disabled: boolean;
}
