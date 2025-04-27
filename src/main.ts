import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { KafkaConsumerService } from './app/infra/messaging/kafka/kafka-consumer.service';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const kafkaConsumerService = app.get(KafkaConsumerService);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });
  await app.startAllMicroservices();

  console.log(
    `🚀 Email service running on http://localhost:${process.env.PORT || 3000}`,
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
