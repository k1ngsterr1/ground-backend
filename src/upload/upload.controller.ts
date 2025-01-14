import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Request() req, @UploadedFile() file) {
    console.log('test1');
    return this.uploadService.uploadImage(req, file);
  }

  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Request() req, @UploadedFile() file) {
    console.log('test2');
    return this.uploadService.uploadFile(req, file);
  }
}
