import { Module } from '@nestjs/common';
import { EmailModule } from './app/application/email/email.module';
import { HealthModule } from './app/application/health/health.module';
import { EmailUseCase } from './app/application/email/email.usecase';
import { EmailController } from './app/application/email/email.controller';

@Module({
  imports: [EmailModule, HealthModule],
  providers: [EmailUseCase],
  controllers: [EmailController],
})
export class AppModule {}
