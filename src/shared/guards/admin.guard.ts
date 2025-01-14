import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export const COOKIE_NAME = 'COOKIE_NAME';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(COOKIE_NAME) private readonly cookieName: string, // Injected value
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookies(request);

    if (!token) {
      throw new UnauthorizedException(
        `Token not found in cookie: ${this.cookieName}`,
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || '123',
      });

      if (!payload || payload.role !== 'admin') {
        throw new UnauthorizedException('Access denied: Admins only');
      }

      request['user'] = payload; // Attach user data to the request
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    return request.cookies?.[this.cookieName];
  }
}
