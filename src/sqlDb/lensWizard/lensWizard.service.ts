import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';

import { updateCascadeDB } from '@/utils/orm.utils';
import { buildTree } from '@/utils/array.utils';

import { LensWizard, Decision, Choice, Step } from './lensWizard.model';
import { CreateLensWizardDto } from './lensWizard.dto';

@Injectable()
export class LensWizardService {
  constructor(
    @InjectModel(LensWizard)
    private lensWizardRepo: typeof LensWizard,
    @InjectModel(Decision)
    private decisionRepo: typeof Decision,
    @InjectModel(Step)
    private stepRepo: typeof Step,
  ) {}

  private readonly lensWizardOption = {
    include: [{model: Decision, include: [Choice]}, Step],
    // include: { all: true},
  };
  private readonly decisionOption = {
    include: [Choice],
  };

  // [
  //   'decisions',
  //   'decisions.choices',
  //   'steps',
  // ];

  async getLensWizards(): Promise<LensWizard[]> {
    return await this.lensWizardRepo.findAll(this.lensWizardOption);
  }

  async findLensWizard(id: number, options: any = {}): Promise<any> {
    const steps = await this.stepRepo.findAll({ where: { wizardId: id } });

    const stepTree = buildTree(steps);
    console.warn(stepTree);

    // const lensWizard = await this.lensWizardRepo.findOne(id, {
    //   relations: this.lensWizardRelations,
    //   ...options,
    // });

    const lensWizard = await this.lensWizardRepo.findByPk(id);
    if (!lensWizard.id) return {};

    return {
      ...lensWizard,
      steps: stepTree,
    };
  }

  async createLensWizard(entity: CreateLensWizardDto): Promise<any> {
    return await this.lensWizardRepo.create(entity);
  }

  async updateLensWizard(id, updatingQuery: any): Promise<any> {
    // const step1 = this.stepRepo.create({
    //   id: '1231232',
    //   name: '11',
    //   wizardId: '1',
    //   choiceId: '1',
    // });
    // const step2 = this.stepRepo.create({
    //   name: '22',
    //   wizardId: '1',
    //   choiceId: '2',
    //   parentId: step1.id,
    // });
    // this.stepRepo.save([step1, step2]);
    // return await this.lensWizardRepo.update(entity.id, entity);
    // const rootStep = new Step();
    // rootStep.choiceId = 1;
    // rootStep.wizardId = 1;
    // rootStep.name = '111';
    // const res = await this.stepRepo.save(rootStep);
    // const nextUpdateQuery = {
    //   ...updatingQuery,
    //   steps: [rootStep]
    // };
    // return updateCascadeDB(
    //   this.lensWizardRepo,
    //   id,
    //   updatingQuery,
    //   this.lensWizardRelations,
    // );
  }

  async deleteLensWizard(id): Promise<any> {
    return await this.lensWizardRepo.destroy(id);
  }

  async getDecisions({ wizardId }): Promise<Decision[]> {
    return await this.decisionRepo.findAll({ include: Choice });
  }

  async findDecision(id, options: any): Promise<any> {
    // return await this.decisionRepo.findOne(id, {
    //   relations: ['choices'],
    // });
  }

  async createDecision({ wizardId, createDto }): Promise<Decision> {
    const savingQuery = { ...createDto, wizardId };
    return await this.decisionRepo.create(savingQuery, { include: Choice });
  }

  async updateDecision(id, updatingQuery: any): Promise<any> {
    const relations = ['choices'];
    return updateCascadeDB(this.decisionRepo, id, updatingQuery, relations);
  }
}
