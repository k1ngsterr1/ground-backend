import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Add your frontend's origin explicitly
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allows cookies and credentials
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT ?? 6001);
}
bootstrap();
