import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

const uploadDir = join(process.cwd(), 'uploads');

@Module({
  imports: [
    SharedModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(new Error('Only images are allowed...'), false);
        }
      },
    }),
  ],
  controllers: [UploadController],
  providers: [PrismaService, UploadService],
})
export class UploadModule {}
