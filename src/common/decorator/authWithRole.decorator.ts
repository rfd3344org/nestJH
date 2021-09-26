import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@/constant/enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import RoleGuard from '../guard/role.guard';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';


export function AuthWithRole(...roles: any[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RoleGuard),
    ApiBearerAuth(),
  );
}