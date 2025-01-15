import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ComparisonsService } from './comparison.service';

@Controller('comparisons')
export class ComparisonsController {
  constructor(private readonly comparisonsService: ComparisonsService) {}

  @Post(':userId')
  createComparison(@Param('userId') userId: string) {
    return this.comparisonsService.createComparison(+userId);
  }

  @Post(':comparisonId/property/:propertyId')
  addPropertyToComparison(
    @Param('comparisonId') comparisonId: string,
    @Param('propertyId') propertyId: string,
  ) {
    return this.comparisonsService.addPropertyToComparison(
      +comparisonId,
      +propertyId,
    );
  }

  @Delete(':comparisonId/property/:propertyId')
  removePropertyFromComparison(
    @Param('comparisonId') comparisonId: string,
    @Param('propertyId') propertyId: string,
  ) {
    return this.comparisonsService.removePropertyFromComparison(
      +comparisonId,
      +propertyId,
    );
  }

  @Get(':userId')
  getUserComparisons(@Param('userId') userId: string) {
    return this.comparisonsService.getComparison(+userId);
  }
}
