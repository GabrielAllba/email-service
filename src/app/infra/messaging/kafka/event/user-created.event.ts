import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedEvent {
  @ApiProperty()
  email: string;

  @ApiProperty()
  emailVerificationToken: string;
}
