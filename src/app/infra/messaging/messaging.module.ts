import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from 'src/app/application/entities/email';
import { EmailRepository } from 'src/app/application/repositories/email.repository';
import { SendEmailUseCase } from 'src/app/application/use-cases/send-email.use-case';
import { EmailController } from './kafka/controllers/email.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [KafkaConsumerService, SendEmailUseCase, EmailRepository],
  controllers: [EmailController],
})
export class MessagingModule {}
