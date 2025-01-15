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

  async findAll() {
    return this.prisma.property.findMany();
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
    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async remove(id: number) {
    const property = await this.findOne(id); // Ensures property exists
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
