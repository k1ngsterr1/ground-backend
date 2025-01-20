import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: {
        ...createPropertyDto,
        square: Number(createPropertyDto.square),
        price: Number(createPropertyDto.price),
        number: Number(createPropertyDto.number),
        agent:
          createPropertyDto.agent === ('true' as any) ||
          createPropertyDto.agent === true, // Convert to boolean if string
        owner:
          createPropertyDto.owner === ('true' as any) ||
          createPropertyDto.owner === true, // Convert to boolean if string
      },
    });
  }

  async findAll(filters: {
    priceMin?: number;
    priceMax?: number;
    squareMin?: number;
    squareMax?: number;
    location?: string;
  }) {
    const { priceMin, priceMax, squareMin, squareMax, location } = filters;

    return this.prisma.property.findMany({
      where: {
        ...(priceMin !== undefined && { price: { gte: priceMin } }),
        ...(priceMax !== undefined && { price: { lte: priceMax } }),
        ...(squareMin !== undefined && { square: { gte: squareMin } }),
        ...(squareMax !== undefined && { square: { lte: squareMax } }),
        ...(location && {
          location: { contains: location, mode: 'insensitive' },
        }),
      },
    });
  }

  async findOne(id: number) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.findOne(id); // Ensures property exists
    console.log('Existing Property:', property);
    console.log('Update Data:', updatePropertyDto);

    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async getAllLocations() {
    return this.prisma.property.findMany({
      select: {
        location: true,
      },
      distinct: ['location'],
    });
  }

  async remove(id: number) {
    // Check if the property exists
    const property = await this.findOne(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Remove related records in ComparisonProperty
    await this.prisma.comparisonProperty.deleteMany({
      where: { propertyId: id },
    });

    // Remove related records in Favorites
    await this.prisma.favorite.deleteMany({
      where: { propertyId: id },
    });

    // Finally, delete the property
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
