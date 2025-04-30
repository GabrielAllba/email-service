import { Module } from '@nestjs/common';
import { MessagingModule } from './app/infra/messaging/messaging.module';

@Module({
  imports: [MessagingModule],
})
export class AppModule {}
