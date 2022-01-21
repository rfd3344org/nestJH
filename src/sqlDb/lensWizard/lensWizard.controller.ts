import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';

import { LensWizardService } from './lensWizard.service';
import { LensWizard } from './lensWizard.model';
import { CreateLensWizardDto, CreateDecisionDto } from './lensWizard.dto';

@Controller('LensWizard')
@ApiTags('LensWizard')
export class LensWizardController {
  constructor(private service: LensWizardService) {}

  @Get()
  getAll(): Promise<LensWizard[]> {
    return this.service.all();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getById(@Param('id') id): Promise<any> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() body: CreateLensWizardDto): Promise<any> {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id, @Body() record: LensWizard): Promise<any> {
    return this.service.update(id, record);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.service.delete(id);
  }

  @Get(':wizardId/decision')
  @ApiParam({ name: 'wizardId', example: '1' })
  async getAllDecision(@Param('wizardId') wizardId): Promise<any> {
    return this.service.getDecisions({ wizardId });
  }

  @Post(':wizardId/decision')
  @ApiParam({ name: 'wizardId', example: '1' })
  async createDecision(
    @Param('wizardId') wizardId,
    @Body() body: CreateDecisionDto,
  ): Promise<any> {
    return this.service.createDecision(wizardId, body);
  }

  @Patch(':wizardId/decision/:id')
  @ApiParam({ name: 'wizardId', example: '1' })
  @ApiParam({ name: 'id', example: '1' })
  async updateDecision(
    @Param('id') id,
    @Body() body: CreateDecisionDto,
  ): Promise<any> {
    return this.service.updateDecision(id, body);
  }

  @Delete(':wizardId/decision/:id')
  @ApiParam({ name: 'wizardId', example: '1' })
  @ApiParam({ name: 'id', example: '1' })
  async deleteDecision(@Param('id') id): Promise<any> {
    return this.service.deleteDecision(id);
  }
}
