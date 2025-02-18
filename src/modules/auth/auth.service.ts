import { Injectable } from '@nestjs/common';
import UserService from '@/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hashSync, compareSync } from 'bcrypt';
import * as _ from 'lodash';
import { LoginDto } from '@/modules/user/user.type';



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user || compareSync(user.password, password)) return null;

    return _.omit(user, ['password']);
  }

  async login(user: any) {
    return {
      token: this.jwtService.sign(user),
    };
  }
}
