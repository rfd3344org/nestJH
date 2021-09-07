import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './schemas/owner.schema';

@Controller('owner')
@ApiBearerAuth()
@ApiTags('owner')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat111' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createOwnerDto: CreateOwnerDto) {

    await this.ownersService.create(createOwnerDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Owner,
  })
  async findAll(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }
}
