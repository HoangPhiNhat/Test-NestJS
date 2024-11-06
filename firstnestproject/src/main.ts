import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  const runPort = await app.listen(3000);
  if (runPort) {
    console.log(`Running port ${3000}`);
  } else {
    console.log('error');
  }
}
bootstrap();
