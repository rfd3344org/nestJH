import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LensWizard, Decision, Step } from './lensWizard.entity';
import { LensWizardService } from './lensWizard.service';
import { LensWizardController } from './lensWizard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LensWizard, Decision, Step]),
  ],
  providers: [LensWizardService],
  controllers: [LensWizardController],
})
export class LensWizardModule {}
