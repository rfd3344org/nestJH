import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { LensWizard, Decision } from './lensWizard.entity';
import { CreateLensWizardDto } from './lensWizard.dto';

@Injectable()
export class LensWizardService {
  constructor(
    @InjectRepository(LensWizard)
    private lensWizardRepo: Repository<LensWizard>,
    @InjectRepository(Decision)
    private decisionRepo: Repository<Decision>,
  ) {}

  async getLensWizards(): Promise<LensWizard[]> {
    return await this.lensWizardRepo.find({
      // relations: ['decisions', 'decisions.choices'],
    });
  }

  async findLensWizard({ id }): Promise<LensWizard> {
    return await this.lensWizardRepo.findOne(id, {
      relations: ['decisions', 'decisions.choices', 'steps'],
    });
  }

  async createLensWizard(entity: CreateLensWizardDto): Promise<any> {
    return await this.lensWizardRepo.save(entity);
  }

  async updateLensWizard(entity: LensWizard): Promise<UpdateResult> {
    return await this.lensWizardRepo.update(entity.id, entity);
  }

  async deleteLensWizard(id): Promise<DeleteResult> {
    return await this.lensWizardRepo.delete(id);
  }

  async getDecisions({ wizardId }): Promise<Decision[]> {
    return await this.decisionRepo.find({
      relations: ['choices'],
    });
  }

  async createDecision({ wizardId, createDto }): Promise<Decision> {
    const savingQuery = { ...createDto, wizard: wizardId };
    return await this.decisionRepo.save(savingQuery);
  }

  async updateDecision(id, updatingQuery): Promise<any> {
    return await this.decisionRepo.update(id, updatingQuery);
  }
}
