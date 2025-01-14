import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { AuthGuard } from './auth.guard';

@Injectable()
export class UserAuthGuard extends AuthGuard {
  constructor(
    jwtService: JwtService,
    private prisma: PrismaService,
  ) {
    super(jwtService, 'jwt');
  }

  async validateUser(payload: any): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    return !!user;
  }
}
