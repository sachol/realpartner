import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 프론트엔드 통신 허용
  await app.listen(4000);
  console.log('AgentPartner Backend is running on: http://localhost:4000');
}
bootstrap();
