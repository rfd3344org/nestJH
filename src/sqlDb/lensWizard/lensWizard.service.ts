import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { LensWizardEntity, DecisionEntity } from './lensWizard.entity';
import { CreateLensWizardDto } from './lensWizard.dto';

@Injectable()
export class LensWizardService {
  constructor(
    @InjectRepository(LensWizardEntity)
    private entityRepository: Repository<LensWizardEntity>,
    @InjectRepository(DecisionEntity)
    private decisionRepository: Repository<DecisionEntity>,
  ) {}

  async findAll(): Promise<LensWizardEntity[]> {
    return await this.entityRepository.find();
  }

  async create(entity: CreateLensWizardDto): Promise<LensWizardEntity> {
    return await this.entityRepository.save(entity);
  }

  async update(entity: LensWizardEntity): Promise<UpdateResult> {
    return await this.entityRepository.update(entity.id, entity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.entityRepository.delete(id);
  }

  async createDecision({ wizardId, entity }): Promise<DecisionEntity> {
    return await this.decisionRepository.save({ ...entity, wizard: wizardId });
  }
}
