import { ApiProperty } from '@nestjs/swagger';

export class CreateComparisonPropertyDto {
  @ApiProperty({ description: 'Comparison ID', example: 1 })
  comparisonId: number;

  @ApiProperty({ description: 'Property ID', example: 1 })
  propertyId: number;
}
