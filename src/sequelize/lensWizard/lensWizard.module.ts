import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { LensWizard, Decision, Choice, Step } from './lensWizard.model';
import { LensWizardService } from './lensWizard.service';
import { LensWizardController } from './lensWizard.controller';

@Module({
  imports: [SequelizeModule.forFeature([LensWizard, Decision, Choice, Step])],
  providers: [LensWizardService],
  controllers: [LensWizardController],
})
export class LensWizardModule {}
