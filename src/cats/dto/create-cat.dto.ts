import { ApiProperty } from '@nestjs/swagger';

const { MONGO_DB_NAME } = process.env;
console.warn('MONGO_DB_NAME', MONGO_DB_NAME)

export class CreateCatDto {
  @ApiProperty({ default: 'cat1'})
  readonly name: string;

  @ApiProperty({ default: '10'})
  readonly age: number;

  @ApiProperty({ default: MONGO_DB_NAME })
  readonly breed: string;
}
