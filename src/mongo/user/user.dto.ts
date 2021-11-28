import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/constant/enum';


export class CreateUserDto {
  @ApiProperty({ default: 'email'})
  readonly email: string;

  @ApiProperty({ default: 'username'})
  readonly username: string;

  @ApiProperty({ default: 'password'})
  readonly password: string;

  @ApiProperty({ default: 'fullname'})
  readonly fullname: string;

  @ApiProperty({ default: [Role.Viewer], enum: Role })
  readonly roles: string[];
}

export class UpdateUserDto {
  @ApiProperty({ default: 'email'})
  email: string;

  @ApiProperty({ default: 'fullname'})
  fullname: string;

  @ApiProperty({ default: [Role.Viewer], enum: Role })
  roles: string[];

}
