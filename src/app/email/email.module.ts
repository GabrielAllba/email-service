import { Module } from '@nestjs/common';
import { EmailSender } from './email.sender';
import { UserCreatedController } from './user-created/user-created.controller';

@Module({
  controllers: [UserCreatedController],
  providers: [EmailSender],
})
export class EmailModule {}
