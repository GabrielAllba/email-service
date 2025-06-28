import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();

  // ✅ Jalankan gRPC sebagai microservice utama
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.EMAIL_SERVICE_GRPC_PORT || 50052}`,
        package: 'emailservice',
        protoPath: './contract/email-service.proto',
      },
    },
  );

  await grpcApp.listen();
  console.log(
    `✅ Email gRPC service running on port ${process.env.EMAIL_SERVICE_GRPC_PORT || 50052}`,
  );

  // Optional: REST API for health check or swagger (not required by gRPC)
  const restApp = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Email Service')
    .setDescription('API documentation for Email Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(restApp, config);
  SwaggerModule.setup('api', restApp, document);

  await restApp.listen(process.env.PORT ?? 3001);
  console.log(
    `🚀 Email service running on http://localhost:${process.env.PORT || 3001}`,
  );
  console.log(
    `📚 Swagger docs available at http://localhost:${process.env.PORT || 3001}/api`,
  );
}
bootstrap();
