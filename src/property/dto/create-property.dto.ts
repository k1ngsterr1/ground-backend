// property.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the property',
  })
  id: number;

  @ApiProperty({
    example: 'https://example.com',
    description: 'Announcement Link (External)',
  })
  link: string;

  @ApiProperty({
    example: 'Luxury Apartment',
    description: 'The name of the property',
  })
  name: string;

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'List of images for the property',
  })
  image: string[];

  @ApiProperty({ example: 100, description: 'Square footage of the property' })
  square: number;

  @ApiProperty({ example: 100000, description: 'Price of the property' })
  price: number;

  @ApiProperty({ example: 10, description: 'Contact number for the property' })
  number: string;

  @ApiProperty({
    example: 'contact@example.com',
    description: 'Contact information',
  })
  contact: string;

  @ApiProperty({
    example: true,
    description: 'Is the property listed by an agent',
  })
  agent: boolean;

  @ApiProperty({
    example: false,
    description: 'Is the property owned by the user',
  })
  owner: boolean;

  @ApiProperty({ example: 'Apartment', description: 'Type of the property' })
  type: string;

  @ApiProperty({
    example: 'Beautiful apartment in downtown',
    description: 'Description of the property',
  })
  description: string;

  @ApiProperty({ example: 'Downtown', description: 'Location of the property' })
  location: string;
}
