import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'email'})
  readonly email: string;

  @ApiProperty({ default: 'username'})
  readonly username: string;

  @ApiProperty({ default: 'password'})
  readonly password: string;

  @ApiProperty({ default: 'fullname'})
  readonly fullname: string;

  @ApiProperty({ default: 'admin', enum: ['admin', 'support', 'user'] })
  readonly role: string;

}


export class LoginDto {
  @ApiProperty({ default: 'admin'})
  username: string;

  @ApiProperty({ default: 'admin'})
  password: string;

}
