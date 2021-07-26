import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.API_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    console.log(`\x1b[32mready\x1b[0m - started server on port ${port}`);
  });
}

bootstrap();
