import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCreatedEvent {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;
}
