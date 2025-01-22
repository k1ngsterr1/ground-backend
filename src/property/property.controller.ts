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
import { fileStorage, fileFilter } from 'src/upload/upload.service';
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
    @Query('number') number?: string, // Accept the "number" parameter
  ) {
    // Pass the filters to the service
    return this.propertiesService.findAll({
      priceMin: priceMin ? +priceMin : undefined,
      priceMax: priceMax ? +priceMax : undefined,
      squareMin: squareMin ? +squareMin : undefined,
      squareMax: squareMax ? +squareMax : undefined,
      location,
      number: number ? number : undefined, // Convert number to numeric
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
      storage: fileStorage('./uploads'), // Проверьте правильность пути
      fileFilter: fileFilter, // Проверьте работу фильтра
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>, // Получаем загруженные файлы
    @Body() updatePropertyDto: UpdatePropertyDto, // Получаем данные из тела запроса
  ) {
    console.log('Files:', files); // Лог загруженных файлов
    console.log('Form Data (Before Processing):', updatePropertyDto); // Лог DTO до обработки

    // Преобразование строковых значений в числа (цена, площадь)
    if (
      updatePropertyDto.price &&
      typeof updatePropertyDto.price === 'string'
    ) {
      updatePropertyDto.price = parseFloat(updatePropertyDto.price);
    }
    if (
      updatePropertyDto.square &&
      typeof updatePropertyDto.square === 'string'
    ) {
      updatePropertyDto.square = parseFloat(updatePropertyDto.square);
    }

    // Обработка изображений
    let existingImages: string[] = [];
    if (updatePropertyDto.image) {
      if (typeof updatePropertyDto.image === 'string') {
        // Если приходит строка, преобразуем в массив
        existingImages = [updatePropertyDto.image];
      } else if (Array.isArray(updatePropertyDto.image)) {
        // Фильтруем существующие ссылки
        existingImages = updatePropertyDto.image.filter((img) =>
          img.startsWith('http'),
        );
      }
    }

    console.log('Existing Images:', existingImages); // Лог существующих ссылок

    // Добавление новых изображений, если файлы загружены
    if (files && files.length > 0) {
      const uploadedImageUrls = files.map(
        (file) =>
          `${process.env.BASE_URL || 'https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api'}/uploads/${file.filename}`,
      );

      console.log('Uploaded Image URLs:', uploadedImageUrls); // Лог новых ссылок

      // Объединяем старые и новые ссылки
      updatePropertyDto.image = [...existingImages, ...uploadedImageUrls];
    } else {
      // Сохраняем только старые ссылки, если файлов нет
      updatePropertyDto.image = existingImages;
    }

    console.log('Form Data (After Processing):', updatePropertyDto); // Лог DTO после обработки

    // Обновляем данные в базе данных
    const updatedProperty = await this.propertiesService.update(
      id,
      updatePropertyDto,
    );

    console.log('Updated Property:', updatedProperty); // Лог результата обновления

    return updatedProperty;
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
