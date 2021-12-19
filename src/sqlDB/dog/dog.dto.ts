import { ApiProperty } from '@nestjs/swagger';

export class CreateDogDto {
  @ApiProperty({ default: 'dog1' })
  name: string;

  @ApiProperty({ default: 'gray' })
  color: string;

  @ApiProperty({ default: '12' })
  age: number;
}
