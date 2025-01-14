import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export abstract class AuthGuard implements CanActivate {
  constructor(
    protected jwtService: JwtService,
    private readonly cookieName: string, // Название куки
  ) {}

  abstract validateUser(payload: any): Promise<boolean>;

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

      const isValid = await this.validateUser(payload);
      if (!isValid) {
        throw new UnauthorizedException('User validation failed');
      }

      request['user'] = payload; // Привязываем данные к запросу
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    return request.cookies?.[this.cookieName];
  }
}
