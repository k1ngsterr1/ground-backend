import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileStorage } from 'src/upload/upload.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesService } from './property.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { ComparisonsService } from 'src/comparison/comparison.service';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly favoritesService: FavoritesService,
    private readonly comparisonService: ComparisonsService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 50, {
      storage: fileStorage('./uploads'),
      fileFilter: fileFilter,
    }),
  )
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    const imageUrls = files.map(
      (file) =>
        `${process.env.BASE_URL || 'https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api'}/uploads/${file.filename}`,
    );

    createPropertyDto.image = imageUrls;

    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll(
    @Query('priceMin') priceMin?: number,
    @Query('priceMax') priceMax?: number,
    @Query('squareMin') squareMin?: number,
    @Query('squareMax') squareMax?: number,
    @Query('location') location?: string,
    @Query('number') number?: string,
    @Query('name') name?: string, // Accept the "name" parameter
  ) {
    // Pass the filters to the service
    return this.propertiesService.findAll({
      priceMin: priceMin ? +priceMin : undefined,
      priceMax: priceMax ? +priceMax : undefined,
      squareMin: squareMin ? +squareMin : undefined,
      squareMax: squareMax ? +squareMax : undefined,
      location,
      number: number ? number : undefined,
      name: name ? name : undefined, // Add name parameter
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Get('/get/locations')
  async getAllLocations() {
    const locations = await this.propertiesService.getAllLocations();
    return locations.map((property) => property.location); // Return only the location strings
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('image', 50, {
      storage: fileStorage('./uploads'),
      fileFilter: fileFilter,
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>, // Получаем новые файлы
    @Body() updatePropertyDto: UpdatePropertyDto, // DTO с остальными данными
  ) {
    console.log('Files:', files); // Лог загруженных файлов
    console.log('Form Data (Before Processing):', updatePropertyDto); // Лог данных до обработки

    // Преобразуем строку price в число, если это строка
    if (
      updatePropertyDto.price &&
      typeof updatePropertyDto.price === 'string'
    ) {
      updatePropertyDto.price = parseFloat(updatePropertyDto.price);
    }

    // Преобразуем строку square в число, если это строка
    if (
      updatePropertyDto.square &&
      typeof updatePropertyDto.square === 'string'
    ) {
      updatePropertyDto.square = parseFloat(updatePropertyDto.square);
    }

    // Получаем существующие изображения из DTO
    const existingImages =
      typeof updatePropertyDto.image === 'string'
        ? [updatePropertyDto.image] // Если это строка, превращаем в массив
        : updatePropertyDto.image || []; // Если это массив, используем его, иначе пустой массив

    // Генерируем ссылки для новых файлов
    const baseUrl =
      process.env.BASE_URL || 'https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api';
    const newImageUrls = files.map(
      (file) => `${baseUrl}/uploads/${file.filename}`,
    );

    console.log('New Image URLs:', newImageUrls); // Лог новых ссылок

    // Объединяем существующие ссылки с новыми
    const updatedImages = [...existingImages, ...newImageUrls];

    // Обновляем DTO
    updatePropertyDto.image = updatedImages;

    console.log('Form Data (After Processing):', updatePropertyDto); // Лог данных после обработки

    // Обновляем объект через сервис
    const updatedProperty = await this.propertiesService.update(
      id,
      updatePropertyDto,
    );

    // Возвращаем обновленный объект
    return updatedProperty;
  }

  @Patch(':id/add-image')
  async addImage(
    @Param('id', ParseIntPipe) id: number,
    @Body('imageUrl') imageUrl: string,
  ) {
    if (!imageUrl) throw new NotFoundException('imageUrl is required');
    return this.propertiesService.addImageToProperty(id, imageUrl);
  }

  @Patch(':id/remove-image')
  async removeImage(
    @Param('id', ParseIntPipe) id: number,
    @Body('imageUrl') imageUrl: string,
  ) {
    if (!imageUrl) throw new NotFoundException('imageUrl is required');
    return this.propertiesService.removeImageFromProperty(id, imageUrl);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const propertyId = +id;

    // Check if the property exists
    const property = await this.propertiesService.findOne(propertyId);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    await this.comparisonService.removePropertyFromComparison(
      req.user.sub,
      propertyId,
    );

    // Remove the property from users' favorites
    await this.favoritesService.removeFavorite(req.user.sub, propertyId);

    // Remove the property itself
    return this.propertiesService.remove(propertyId);
  }
}
