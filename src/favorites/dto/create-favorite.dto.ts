// favorite.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the favorite',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who added this favorite',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the property being favorited',
  })
  propertyId: number;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    description: 'The creation date of the favorite',
  })
  createdAt: Date;
}
