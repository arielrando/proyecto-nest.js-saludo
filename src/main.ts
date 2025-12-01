import 'reflect-metadata';
import {config} from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
  console.log("Servidor Nest corriendo en http://localhost:3000");
}

bootstrap();