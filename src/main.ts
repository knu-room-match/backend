import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomIoAdapter } from './common/adapter/custom-io-adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { GlobalResponseInterceptor } from './common/interceptor/global-response.interceptor';

const config = new DocumentBuilder()
  .setTitle('Chat API')
  .setDescription('Chat service API documentation')
  .setVersion('1.0')
  .addTag('chat')
  .build();

const loadCors = async (app: INestApplication) => {
  app.enableCors({
    origin: ['http://localhost:5173'],
  });
};

const loadSwagger = async (app: INestApplication) => {
  SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, config));
};

async function bootstrap() {
  console.log(process.env.REFRESH_ALGORITHM);
  const app = await NestFactory.create(AppModule);

  const customIoAdapter = new CustomIoAdapter(app);
  const globalExceptionFilter = new GlobalExceptionFilter();
  // const validationPipe = new ValidationPipe();
  app.useWebSocketAdapter(customIoAdapter);
  // app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(globalExceptionFilter);
  await loadSwagger(app);
  await loadCors(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
