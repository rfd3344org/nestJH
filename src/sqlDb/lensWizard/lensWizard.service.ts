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
  }

  async delete(id): Promise<any> {
    return await this.lensWizardRepo.destroy(id);
  }

  async getDecisions({ wizardId }): Promise<Decision[]> {
    return await this.decisionRepo.findAll({
      where: { wizardId },
      ...this.decisionOption,
    });
  }

  async createDecision({ wizardId, createDto }): Promise<Decision> {
    const savingQuery = { ...createDto, wizardId };
    return await this.decisionRepo.create(savingQuery, { include: Choice });
  }

  async updateDecision(id, record: any): Promise<any> {
    const queryRecord = {
      // id,
      ...record,
    };
    console.warn('queryRecord', queryRecord)

    return await this.decisionRepo.create(queryRecord, {
      include: Choice,
      // isNewRecord: false,
    });

    return await this.decisionRepo.upsert(queryRecord, {
      // where: { id },
    });
  }

  async deleteDecision(id): Promise<any> {
    return this.decisionRepo.destroy({ where: { id } });
  }
}
