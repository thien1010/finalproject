import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('GW-FinalProject').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
  });
  app.use(express.static('.'));

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log('port:', port);
  });
}

bootstrap();
