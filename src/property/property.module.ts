import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { PropertiesController } from './property.controller';
import { PropertiesService } from './property.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AdminGuard, COOKIE_NAME } from 'src/shared/guards/admin.guard';
import { SharedModule } from 'src/shared/shared.module';
import { ComparisonsService } from 'src/comparison/comparison.service';

@Module({
  imports: [SharedModule],
  controllers: [PropertiesController],
  providers: [
    PropertiesService,
    ComparisonsService,
    PrismaService,
    FavoritesService,
    AdminGuard,
    {
      provide: COOKIE_NAME,
      useValue: 'jwt', // The name of the cookie to use
    },
  ],
  exports: [AdminGuard],
})
export class PropertiesModule {}
