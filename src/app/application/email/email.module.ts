import { EmailController } from './email.controller';
import { EmailUseCase } from './email.usecase';
import { Module } from '@nestjs/common';

@Module({
  providers: [EmailUseCase],
  controllers: [EmailController],
})
export class EmailModule {}
