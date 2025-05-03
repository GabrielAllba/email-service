import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Email Service')
    .setDescription('API documentation for Email Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice({
    // kafka consumer
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'email-service',
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
      },
      consumer: {
        groupId: 'email-consumer-group',
      },
    },
  });
  await app.startAllMicroservices();

  console.log(
    `🚀 Email service running on http://localhost:${process.env.PORT || 3000}`,
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
