import { ApiProperty } from '@nestjs/swagger';

export class CreateDogDto {
  @ApiProperty({ default: 'dog1' })
  name: string;

  @ApiProperty({ default: 12 })
  dogAge: number;
}
