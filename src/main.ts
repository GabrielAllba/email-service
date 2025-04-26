import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { KafkaAdminService } from './app/email/messaging/kafka/kafka.admin';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const kafkaAdmin = new KafkaAdminService();
  await kafkaAdmin.createTopicIfNotExists('user.created');

  app.connectMicroservice({
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
