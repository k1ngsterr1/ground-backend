import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    try {
      const { user, token } = await this.authService.register(registerDto);

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      });

      return res.send({ uid: user.id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const { user, token } = await this.authService.login(loginDto);

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.send({ uid: user.id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      // Устанавливаем cookie с истёкшим временем
      res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0), // Устанавливаем прошедшую дату, чтобы удалить cookie
      });

      return res.status(200).send({ message: 'Logged out successfully' });
    } catch {
      throw new HttpException(
        'Failed to logout',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register-manager')
  async registerManager(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ) {
    try {
      const { user, token } =
        await this.authService.registerManager(registerDto);

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      });

      return res.send({ uid: user.id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthService)
  @Get('check-token')
  async checkToken() {
    return { isValid: true };
  }
}
