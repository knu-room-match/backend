import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomIoAdapter } from './common/adapter/custom-io-adapter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const customIoAdapter = new CustomIoAdapter(app);
  app.useWebSocketAdapter(customIoAdapter);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
