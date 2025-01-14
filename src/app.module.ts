import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComparisonsModule } from './comparison/comparison.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PropertiesModule } from './property/property.module';
import { SharedModule } from './shared/shared.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    UploadModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PropertiesModule,
    FavoritesModule,
    ComparisonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
