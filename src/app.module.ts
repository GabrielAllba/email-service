import { Module } from '@nestjs/common';
import { EmailModule } from './app/application/email/email.module';
import { HealthModule } from './app/application/health/health.module';
import { MessagingModule } from './app/infra/messaging/messaging.module';

@Module({
  imports: [MessagingModule, EmailModule, HealthModule],
})
export class AppModule {}
