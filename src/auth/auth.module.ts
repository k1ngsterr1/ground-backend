import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAuthGuard } from 'src/shared/guards/user.auth.guard';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [SharedModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserAuthGuard],
  exports: [UserAuthGuard],
})
export class UserAuthModule {}
