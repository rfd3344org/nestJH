
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { Role } from '@/constant/enum';

@Injectable()
export default class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = _.union(
      this.reflector.get<string[]>('roles', context.getClass()),
      this.reflector.get<string[]>('roles', context.getHandler())
    );

    if (!allowedRoles) return false;

    const request = context.switchToHttp().getRequest();
    const userRoles : Role[] = request.user?.roles;
    if(!userRoles) return false;

    return userRoles.some(
      role => !!allowedRoles.find(item => item === role)
    );
  }
}
