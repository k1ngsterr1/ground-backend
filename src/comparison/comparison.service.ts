import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ComparisonsService {
  constructor(private prisma: PrismaService) {}

  async createComparison(userId: number) {
    return this.prisma.comparison.create({
      data: {
        userId,
      },
    });
  }

  async addPropertyToComparison(comparisonId: number, propertyId: number) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }

    return this.prisma.comparisonProperty.create({
      data: {
        comparisonId,
        propertyId,
      },
    });
  }

  async removePropertyFromComparison(comparisonId: number, propertyId: number) {
    return this.prisma.comparisonProperty.deleteMany({
      where: {
        comparisonId,
        propertyId,
      },
    });
  }

  async getComparison(userId: number) {
    return this.prisma.comparison.findMany({
      where: { userId },
      include: {
        properties: {
          include: {
            property: true,
          },
        },
      },
    });
  }
}
