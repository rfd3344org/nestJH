import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
@ApiBearerAuth()
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'ApiOperation summary' })
  // @ApiQuery({ name: 'role', enum: ['Admin', 'Moderator', 'User'] })

  @ApiQuery({ name: 'role' })
  // @ApiBody({ type: [CreateCatDto] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
