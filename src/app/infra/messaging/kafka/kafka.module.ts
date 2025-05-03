import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SendEmailUseCase } from 'src/app/application/email/use-cases/send-email.use-case';
import { EmailController } from './controllers/email.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'CLIENT_EMAIL_SERVICE',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'CONSUMER_EMAIL_SERVICE',
          },
        },
      },
    ]),
  ],
  providers: [SendEmailUseCase],
  controllers: [EmailController],
})
export class KafkaModule {}
