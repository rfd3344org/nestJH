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
    include: [{ model: Decision, include: [Choice] }, { model: Step, include: [Step] } ],
  };
  private readonly decisionOption = {
    include: [Choice],
  };

  async all(): Promise<LensWizard[]> {
    return await this.lensWizardRepo.findAll(this.lensWizardOption);
  }

  async findById(id: number): Promise<any> {
    // const steps = await this.stepRepo.findAll({ where: { wizardId: id } });

    // const stepTree = buildTree(steps);
    // console.warn(stepTree);

    // const lensWizard = await this.lensWizardRepo.findOne(id, {
    //   relations: this.lensWizardRelations,
    //   ...options,
    // });

    // return {
    //   ...lensWizard,
    //   steps: stepTree,
    // };

    const lensWizard = await this.lensWizardRepo.findByPk(
      id,
      this.lensWizardOption,
    );
    if (!lensWizard.id) return {};

    return lensWizard;
  }

  async create(record: CreateLensWizardDto): Promise<any> {
    return await this.lensWizardRepo.create(record);
  }

  async update(id, record: any): Promise<any> {
    const steps = record.steps;
    const stepsFlatten = flattenTree(steps);

    console.warn('stepsFlatten', stepsFlatten);
    // const stepCreateRes = await this.stepRepo.bulkCreate(stepsFlatten, {
    //   updateOnDuplicate: [
    //     'name',
    //     'wizardId',
    //     'choiceId',
    //     'parentId',
    //     'updatedAt',
    //   ],
    // });

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
