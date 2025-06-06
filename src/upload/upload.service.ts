import { Injectable, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from 'src/shared/prisma/prisma.service';

export const fileStorage = (destination: string) =>
  diskStorage({
    destination,
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  });

export const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska', // quicktime = .mov, x-msvideo = .avi, x-matroska = .mkv
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new Error('Only image and video files are allowed!'),
      false,
    );
  }

  callback(null, true);
};

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  // Always use the production domain
  private getBasePath(): string {
    const basePath = '/api/uploads';
    const host = 'https://xn----92-53d6cjmsd6amk0d.xn--p1ai'; // Hardcoded domain
    return `${host}${basePath}`;
  }

  async uploadImage(@UploadedFile() file) {
    const fileUrl = `${this.getBasePath()}/${file.filename}`;
    return { url: fileUrl };
  }

  async uploadFile(@UploadedFile() file) {
    const fileUrl = `${this.getBasePath()}/${file.filename}`;
    return { url: fileUrl };
  }
}
