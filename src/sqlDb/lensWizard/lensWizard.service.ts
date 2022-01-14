import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { updateCascadeDB } from '@/utils/orm.utils';
import { buildTree, flattenTree } from '@/utils/array.utils';

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
    include: [{ model: Decision, include: [Choice] }, Step],
    // raw: true,
  };
  private readonly decisionOption = {
    include: [Choice],
  };

  async all(): Promise<LensWizard[]> {
    return await this.lensWizardRepo.findAll();
  }

  async findById(id: number): Promise<any> {
    const lensWizard = await this.lensWizardRepo.findByPk(
      id,
      this.lensWizardOption,
    );
    if (!lensWizard.id) return {};

    const steps = lensWizard.get('steps', { plain: true });
    const nextSteps = buildTree(steps, 'parentId', 'next');
    lensWizard.setDataValue('stepsTree', nextSteps);
    lensWizard.setDataValue('steps', undefined);

    return lensWizard;
  }

  async create(record: CreateLensWizardDto): Promise<any> {
    return await this.lensWizardRepo.create(record);
  }

  async update(id, record: any): Promise<any> {
    const stepsTree = record.stepsTree;
    const stepsFlatten = flattenTree(stepsTree, 'next');

    const updateRecord = {
      // ...record,
      id,
      steps: stepsFlatten,
    };
    return await this.lensWizardRepo.upsert(updateRecord, {
      // where: { id },
      returning: true,
    });
    // return await this.lensWizardRepo.bulkCreate([updateRecord], {
    //   updateOnDuplicate: ['name', 'steps', 'decisions', 'updatedAt']
    // });
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

  async delete(id): Promise<any> {
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
