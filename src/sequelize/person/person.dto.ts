import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty({ default: 'erson' })
  name: string;



}
