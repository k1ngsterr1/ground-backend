import { PartialType } from '@nestjs/mapped-types';
import { CreateComparisonDto } from './create-comparison.dto';

export class UpdateComparisonDto extends PartialType(CreateComparisonDto) {}
