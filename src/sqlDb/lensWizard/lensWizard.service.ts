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
    @InjectModel(Decision)
    private choiceRepo: typeof Choice,
    @InjectModel(Step)
    private stepRepo: typeof Step,
  ) {}

  private readonly lensWizardOption = {
    include: [{ model: Decision, include: [Choice] }, Step],
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

    if (!lensWizard?.id) return {};

    const steps = lensWizard.get('steps', { plain: true });
    const nextSteps = buildTree(steps, 'parentId', 'next');
    lensWizard.set('steps', nextSteps, { reset: true, raw: true });

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
  }

  async delete(id): Promise<any> {
    return await this.lensWizardRepo.destroy(id);
  }

  // decision APIs
  async getDecisions({ wizardId }): Promise<Decision[]> {
    return await this.decisionRepo.findAll({
      where: { wizardId },
      ...this.decisionOption,
    });
  }

  async createDecision(wizardId: string, record: any): Promise<Decision> {
    const createQ = { wizardId, ...record };
    return await this.decisionRepo.create(createQ, { include: Choice });
  }

  async updateDecision(id: string, record: any): Promise<any> {
    const updateQ = {

      ...record,
    };
    console.warn('queryRecord', id, record);

    return await this.decisionRepo.update(updateQ, { where: { id } });
  }

  async deleteDecision(id): Promise<any> {
    return this.decisionRepo.destroy({ where: { id } });
  }
}
