import { PartialType } from '@nestjs/mapped-types';
import { CreateComparisonPropertyDto } from './create-comparison.dto';

export class UpdateComparisonPropertyDto extends PartialType(
  CreateComparisonPropertyDto,
) {}
