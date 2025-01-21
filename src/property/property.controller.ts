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
    FilesInterceptor('file', 50, {
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
        `${process.env.BASE_URL || 'http://localhost:6001'}/uploads/${file.filename}`,
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
    FilesInterceptor('file', 50, {
      storage: fileStorage('./uploads'),
      fileFilter: fileFilter,
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    console.log('Files:', files); // Log uploaded files
    console.log('Form Data (Before Processing):', updatePropertyDto); // Log parsed form data

    // Convert price to a number if it exists and is a string
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

    // Include files in the DTO if necessary
    if (files && files.length > 0) {
      updatePropertyDto.image = files.map((file) => file.path);
    }

    console.log('Form Data (After Processing):', updatePropertyDto); // Log updated form data

    return this.propertiesService.update(id, updatePropertyDto);
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
