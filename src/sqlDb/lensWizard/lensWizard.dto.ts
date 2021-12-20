import { ApiProperty } from '@nestjs/swagger';

export class CreateLensWizardDto {
  @ApiProperty({ default: 'LensWizard' })
  name: string;

  @ApiProperty({ default: 'gray' })
  color: string;

  @ApiProperty({ default: '12' })
  age: number;
}


export class CreateDecisionDto {
  @ApiProperty({ default: 'color' })
  name: string;

  @ApiProperty({ default: '1' })
  wizard: string;

  // @ApiProperty({ default: '12' })
  // age: number;
}