import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendEmailUseCase } from 'src/app/application/use-cases/send-email.use-case';
import { UserCreatedEvent } from '../event/user-created.event';

@Controller('email')
export class EmailController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @EventPattern('user.created')
  async handleNotificationEvent(@Payload() payload: UserCreatedEvent) {
    const { id, email, username } = payload;

    const verificationUrl = `https://yourapp.com/verify?id=${id}?email=${email}?username=${username}`;
    const html = `<p>Thank you for registering!</p>
                  <p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`;
    await this.sendEmailUseCase.execute({
      id: id,
      to: email,
      subject: 'Verify your Email',
      html: html,
    });
  }
}
