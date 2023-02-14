import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from './logger/logger';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(new Logger());

  const port = +process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription(
      "Let's try to create a Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!",
    )
    .setVersion('1.0')
    .addTag('rs school api')
    .addServer(`http://localhost:${port}`)
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
