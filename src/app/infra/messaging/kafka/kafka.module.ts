import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SendEmailUseCase } from 'src/app/application/email/use-cases/send-email.use-case';
import { EmailController } from './controllers/email.controller';

@Module({
  imports: [
    // kafka producer
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'email-service',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
        },
      },
    ]),
  ],
  providers: [SendEmailUseCase],
  controllers: [EmailController],
})
export class KafkaModule {}
