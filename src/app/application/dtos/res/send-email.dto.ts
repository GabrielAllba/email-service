import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendEmailRes {
  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  html: string;
}
