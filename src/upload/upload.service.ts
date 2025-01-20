import { Injectable, Request, UploadedFile } from '@nestjs/common';
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

export const imageFileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  private getBasePath(req: any): string {
    const basePath = '/api/uploads';
    const host =
      process.env.NODE_ENV === 'production'
        ? 'https://xn----92-53d6cjmsd6amk0d.xn--p1ai'
        : `${req.protocol}://${req.get('Host')}`;
    return `${host}${basePath}`;
  }

  async uploadImage(@Request() req, @UploadedFile() file) {
    const fileUrl = `${this.getBasePath(req)}/${file.filename}`;

    return { url: fileUrl };
  }

  async uploadFile(@Request() req, @UploadedFile() file) {
    const fileUrl = `${this.getBasePath(req)}/${file.filename}`;

    return { url: fileUrl };
  }
}
