import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':userId/:propertyId')
  addFavorite(
    @Param('userId') userId: string,
    @Param('propertyId') propertyId: string,
  ) {
    return this.favoritesService.addFavorite(+userId, +propertyId);
  }

  @Delete(':userId/:propertyId')
  removeFavorite(
    @Param('userId') userId: string,
    @Param('propertyId') propertyId: string,
  ) {
    return this.favoritesService.removeFavorite(+userId, +propertyId);
  }

  @Get(':userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getUserFavorites(+userId);
  }
}
