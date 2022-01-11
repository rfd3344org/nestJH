import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateResult,
  DeleteResult,
  FindOneOptions,
  FindConditions,
} from 'typeorm';
import { LensWizard, Decision, Step } from './lensWizard.entity';
import { CreateLensWizardDto } from './lensWizard.dto';
import { updateCascadeDB } from '@/utils/orm.utils';
import * as _ from 'lodash';
import { buildTree } from '@/utils/array.utils';

@Injectable()
export class LensWizardService {
  constructor(
    @InjectRepository(LensWizard)
    private lensWizardRepo: Repository<LensWizard>,
    @InjectRepository(Decision)
    private decisionRepo: Repository<Decision>,
    @InjectRepository(Step)
    private stepRepo: Repository<Step>,
  ) {}

  private readonly lensWizardRelations = [
    'decisions',
    'decisions.choices',
    'steps',
  ];

  async getLensWizards(): Promise<LensWizard[]> {
    return await this.lensWizardRepo.find({
      // relations: ['decisions', 'decisions.choices'],
    });
  }

  async findLensWizard(id: number, options: any = {}): Promise<any> {
    const steps = await this.stepRepo.find({ where: { wizardId: id } });

    const stepTree = buildTree(steps)
    console.warn(stepTree);

    const lensWizard = await this.lensWizardRepo.findOne(id, {
      relations: this.lensWizardRelations,
      ...options,
    });

    if(!lensWizard.id) return {};

    return {
      ...lensWizard,
      steps: stepTree,
    };
  }

  async createLensWizard(entity: CreateLensWizardDto): Promise<any> {
    return await this.lensWizardRepo.save(entity);
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

  async deleteLensWizard(id): Promise<DeleteResult> {
    return await this.lensWizardRepo.delete(id);
  }

  async getDecisions({ wizardId }): Promise<Decision[]> {
    return await this.decisionRepo.find({
      relations: ['choices'],
    });
  }

  async findDecision(id, options: FindOneOptions = {}): Promise<Decision> {
    return await this.decisionRepo.findOne(id, {
      relations: ['choices'],
    });
  }

  async createDecision({ wizardId, createDto }): Promise<Decision> {
    const savingQuery = { ...createDto, wizardId };
    return await this.decisionRepo.save(savingQuery);
  }

  async updateDecision(id, updatingQuery: any): Promise<any> {
    // const decision = await this.findDecision(id);
    // const nextDecision = {
    //   ...decision,
    //   ...updatingQuery,
    // }
    // console.warn(id, decision, nextDecision)
    // return await this.decisionRepo.save(nextDecision);
    const relations = ['choices'];
    return updateCascadeDB(this.decisionRepo, id, updatingQuery, relations);
  }
}
