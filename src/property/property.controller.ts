import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileStorage, imageFileFilter } from 'src/upload/upload.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesService } from './property.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: fileStorage('./uploads'),
      fileFilter: imageFileFilter,
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
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
