import { ApiProperty } from '@nestjs/swagger';

export class CreateLensWizardDto {
  @ApiProperty({ default: 'LensWizard' })
  name: string;

  // @ApiProperty({ default: [] })
  // decisions: number[];
}

export class CreateDecisionDto {
  @ApiProperty({ default: 'color' })
  name: string;

  // @ApiProperty({ default: '1' })
  // wizard: string;

  @ApiProperty({
    default: [{ name: 'red' }, { name: 'green' }, { name: 'blue' }],
  })
  choices: CreateChoiceDto[];
}

class CreateChoiceDto {

  name: string;
}
