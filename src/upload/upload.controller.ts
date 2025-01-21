import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/uploadImages')
  @UseInterceptors(
    FilesInterceptor('files', 50, {
      // Лимит: до 50 файлов
      storage: diskStorage({
        destination: './uploads', // Путь для сохранения файлов
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Лимит на размер одного файла (5MB)
      },
    }),
  )
  async uploadImages(
    @Request() req,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // `files` — массив загруженных файлов
    return this.uploadService.uploadImage(files);
  }

  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Request() req, @UploadedFile() file) {
    console.log('test2');
    return this.uploadService.uploadFile(file);
  }
}
