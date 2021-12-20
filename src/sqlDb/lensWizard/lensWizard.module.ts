import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LensWizardEntity, DecisionEntity } from './lensWizard.entity';
import { LensWizardService } from './lensWizard.service';
import { LensWizardController } from './lensWizard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LensWizardEntity, DecisionEntity]),
    // TypeOrmModule.forFeature([DecisionEntityntity]),
  ],
  providers: [LensWizardService],
  controllers: [LensWizardController],
})
export class LensWizardModule {}
