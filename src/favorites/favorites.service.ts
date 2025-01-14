import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: number, propertyId: number) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },
    });
  }

  async removeFavorite(userId: number, propertyId: number) {
    return this.prisma.favorite.deleteMany({
      where: {
        userId,
        propertyId,
      },
    });
  }

  async getUserFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        property: true,
      },
    });
  }
}
