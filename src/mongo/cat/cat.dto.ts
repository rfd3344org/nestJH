import { ApiProperty } from '@nestjs/swagger';


export class CreateCatDto {
  @ApiProperty({ default: 'cat1'})
  readonly name: string;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly breed: string;
}
