import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { recursive, buildTree, flattenTree } from '@/utils/array.utils';

import { LensWizard, Decision, Choice, Step } from './lensWizard.model';
import { CreateLensWizardDto } from './lensWizard.dto';

@Injectable()
export class LensWizardService {
  constructor(
    @InjectModel(LensWizard)
    private lensWizardRepo: typeof LensWizard,
    @InjectModel(Decision)
    private decisionRepo: typeof Decision,
    @InjectModel(Choice)
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

  async findByPk(id: string): Promise<any> {
    const lensWizard = await this.lensWizardRepo.findByPk(
      id,
      this.lensWizardOption,
    );
    if (!lensWizard) return lensWizard;

    const steps = lensWizard.get('steps', { plain: true });
    const nextSteps = buildTree(steps, 'parentId', 'next');
    lensWizard.set('steps', nextSteps, { reset: true, raw: true });

    return lensWizard;
  }

  async create(record: any): Promise<any> {
    return await this.lensWizardRepo.create(record);
  }

  async update(id: string, record: any): Promise<any> {
    const { steps, ...updateQ } = record;

    recursive(steps, 'next', (item) => {
      console.warn(item);
    });
    return;
    const stepsArr = flattenTree(steps, 'next');

    // update steps records
    const stepsAll = await this.stepRepo.findAll({
      where: { wizardId: id },
    });
    const steps2Delete = _.differenceBy(stepsAll, stepsArr, 'id');
    await this.stepRepo.destroy({
      where: { id: _.map(steps2Delete, 'id') },
    });
    await this.stepRepo.bulkCreate(stepsArr, {
      updateOnDuplicate: ['name', 'choiceId', 'disabled', 'updatedAt'],
    });

    await this.decisionRepo.update(updateQ, {
      where: { id },
    });
    return true;
  }

  async delete(id): Promise<any> {
    return await this.lensWizardRepo.destroy(id);
  }

  // decision APIs
  async getDecisionByWizardId(wizardId): Promise<Decision[]> {
    return await this.decisionRepo.findAll({
      where: { wizardId },
      ...this.decisionOption,
    });
  }

  async getDecisionById(id: string): Promise<Decision> {
    return await this.decisionRepo.findOne({
      where: { id },
      ...this.decisionOption,
    });
  }

  async createDecision(wizardId: string, record: any): Promise<Decision> {
    const createQ = { wizardId, ...record };
    return this.decisionRepo.create(createQ, { include: Choice });
  }

  async updateDecision(id: string, record: any): Promise<any> {
    const { choices, ...updateQ } = record;

    await this.decisionRepo.update(updateQ, {
      where: { id },
    });

    // update choices records

    const choicesList = await this.choiceRepo.findAll({
      where: { decisionId: id },
    });
    const choices2Delete = _.differenceBy(choicesList, choices, 'id');
    await this.choiceRepo.destroy({
      where: { id: _.map(choices2Delete, 'id') },
    });

    if (!_.isEmpty(choices)) {
      const nextChoices = choices.map((item) => ({
        decisionId: id,
        ...item,
      }));
      await this.choiceRepo.bulkCreate(nextChoices, {
        updateOnDuplicate: ['name', 'decisionId', 'updatedAt'],
      });
    }

    return this.getDecisionById(id);
  }

  async deleteDecision(id: string): Promise<any> {
    return this.decisionRepo.destroy({ where: { id } });
  }
}
