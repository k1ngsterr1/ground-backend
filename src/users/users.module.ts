import { Module } from '@nestjs/common';
import { AdminGuard, COOKIE_NAME } from 'src/shared/guards/admin.guard';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    AdminGuard,
    PrismaService,
    {
      provide: COOKIE_NAME,
      useValue: 'jwt', // The name of the cookie to use
    },
  ],
  exports: [AdminGuard],
})
export class UsersModule {}
