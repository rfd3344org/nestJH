import { Body, Controller, Get, Post, Request, Param, Query, UseGuards, Delete, Patch } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles } from '@/common/decorator/role.decorator';
import RoleGuard from '@/common/guard/role.guard';
import { Role } from '@/constant/enum';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import UserService from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthWithRole } from '@/common/decorator/authWithRole.decorator';

@Controller('user')
@ApiTags('user')
// @ApiBearerAuth()
// @Roles('Role.Admin')
  // @AuthWithRole(Role.Viewer)
export default class UserController {
  constructor(private readonly userService: UserService) {}
  // get update create delete

  @Get()
  // @AuthWithRole(Role.Admin)
  getAll() {
    return this.userService.find();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '61349adbfeb0af352aa23199' })
  getById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }

}
