import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomIoAdapter } from './common/adapter/custom-io-adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const customIoAdapter = new CustomIoAdapter(app);
  app.useWebSocketAdapter(customIoAdapter);
  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('Chat service API documentation')
    .setVersion('1.0')
    .addTag('chat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
