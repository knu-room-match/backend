import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomIoAdapter } from './common/adapter/custom-io-adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
// import { GlobalResponseInterceptor } from './common/interceptor/global-response.interceptor';

const config = new DocumentBuilder()
  .setTitle('Chat API')
  .setDescription('Chat service API documentation')
  .setVersion('1.0')
  .addTag('chat')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customIoAdapter = new CustomIoAdapter(app);
  const globalExceptionFilter = new GlobalExceptionFilter();

  app.useWebSocketAdapter(customIoAdapter);
  app.useGlobalFilters(globalExceptionFilter);

  SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
