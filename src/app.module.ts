import { Module } from '@nestjs/common';
import { MessagingModule } from './app/infra/messaging/messaging.module';
import { HealthModule } from './app/application/health/health.module';

@Module({
  imports: [MessagingModule, HealthModule],
})
export class AppModule {}
