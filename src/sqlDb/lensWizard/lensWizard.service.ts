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
    private entityRepository: Repository<LensWizard>,
    @InjectRepository(Decision)
    private decisionRepository: Repository<Decision>,
  ) {}

  async findAll(): Promise<LensWizard[]> {
    return await this.entityRepository.find();
  }

  async create(entity: CreateLensWizardDto): Promise<LensWizard> {
    return await this.entityRepository.save(entity);
  }

  async update(entity: LensWizard): Promise<UpdateResult> {
    return await this.entityRepository.update(entity.id, entity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.entityRepository.delete(id);
  }

  async createDecision({ wizardId, entity }): Promise<Decision> {
    return await this.decisionRepository.save({ ...entity, wizard: wizardId });
  }
}
