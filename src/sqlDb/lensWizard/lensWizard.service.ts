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

  async findAll(): Promise<LensWizard[]> {
    return await this.lensWizardRepo.find({ relations: ['decisions']});
  }

  async create(entity: CreateLensWizardDto): Promise<any> {
    return await this.lensWizardRepo.save(entity);
  }

  async update(entity: LensWizard): Promise<UpdateResult> {
    return await this.lensWizardRepo.update(entity.id, entity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.lensWizardRepo.delete(id);
  }

  async findAllDecision({ wizardId }): Promise<Decision[]> {
    return await this.decisionRepo.find({ relations: ['choices']});
  }


  async createDecision({ wizardId, body }): Promise<Decision> {
    console.warn({ ...body, wizard: wizardId });

    return await this.decisionRepo.save({ ...body, wizard: wizardId });
  }
}
