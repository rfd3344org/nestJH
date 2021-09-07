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

console.log('3333 process', process.env.MONGO_DB_NAME);
@Controller('cats')
@ApiBearerAuth()
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'called ApiOperation' })
  @ApiQuery({ name: 'stringDemo',  })
  @ApiQuery({ name: 'EnumDemo', enum: ['Admin', 'Moderator', 'User'] })
  // @ApiBody({ type: [CreateCatDto] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto) {
    const res = await this.catsService.create(createCatDto);
    return res
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  async findAll(): Promise<Cat[]> {

    console.warn('222process.env', process.env)
    return this.catsService.findAll();
  }
}
