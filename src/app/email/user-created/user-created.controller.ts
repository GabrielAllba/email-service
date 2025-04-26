import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailSender } from '../email.sender';
import { UserCreatedMessage } from './user-created.message';

@Controller()
export class UserCreatedController {
  private readonly logger = new Logger(UserCreatedController.name);

  constructor(private readonly emailSender: EmailSender) {}

  @MessagePattern('user.created')
  async handle(@Payload() message: UserCreatedMessage) {
    const { id, email, username } = message;
    this.logger.log(`Handling user.created for ${email}`);

    const verificationUrl = `https://yourapp.com/verify?id=${id}?email=${email}?username=${username}`;
    const html = `<p>Thank you for registering!</p>
                  <p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`;

    await this.emailSender.sendEmail(email, 'Verify your Email', html);
  }
}
