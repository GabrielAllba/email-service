import { KafkaModule } from 'src/app/infra/messaging/kafka/kafka.module';
import { EmailController } from './email.controller';
import { EmailUseCase } from './email.usecase';
import { Module } from '@nestjs/common';

@Module({
  imports: [KafkaModule],
  providers: [EmailUseCase],
  controllers: [EmailController],
})
export class EmailModule {}
