import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '123', // Общий секрет для всех
      signOptions: { expiresIn: '7d' }, // Время действия токена
    }),
  ],
  exports: [JwtModule], // Экспортируем для использования в других модулях
})
export class SharedModule {}
