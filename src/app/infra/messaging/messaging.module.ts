import { Module } from '@nestjs/common';
import { SendEmailUseCase } from 'src/app/application/use-cases/send-email.use-case';
import { EmailController } from './kafka/controllers/email.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  providers: [KafkaConsumerService, SendEmailUseCase],
  controllers: [EmailController],
})
export class MessagingModule {}
