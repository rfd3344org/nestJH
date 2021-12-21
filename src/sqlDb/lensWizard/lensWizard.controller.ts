import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { LensWizardService } from './lensWizard.service';
import { LensWizard } from './lensWizard.entity';
import { CreateLensWizardDto, CreateDecisionDto } from './lensWizard.dto';

@Controller('LensWizard')
@ApiTags('LensWizard')
export class LensWizardController {
  constructor(private service: LensWizardService) {}

  @Get()
  index(): Promise<LensWizard[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() entitytData: CreateLensWizardDto): Promise<any> {
    return this.service.create(entitytData);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(
    @Param('id') id,
    @Body() entityData: LensWizard,
  ): Promise<any> {
    entityData.id = Number(id);
    return this.service.update(entityData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.service.delete(id);
  }

  @Post(':wizardId/decision')
  @ApiParam({ name: 'wizardId', example: '1' })
  async createDecision(
    @Param('wizardId') wizardId,
    @Body() entityData: CreateDecisionDto,
  ): Promise<any> {
    return this.service.createDecision({ wizardId, entity: entityData });
  }
}
