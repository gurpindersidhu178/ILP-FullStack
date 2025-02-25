import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Security Middleware
  app.use(helmet());  // Helps secure HTTP headers
  app.use(cors());     // Enables CORS for cross-origin requests
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  }));

  await app.listen(3000);
}
bootstrap();

@Controller()
class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 await app.listen(5000);
  console.log(`🚀 Server running at http://localhost:5000`);
}
bootstrap();

