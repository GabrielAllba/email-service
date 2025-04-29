import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendEmailUseCase } from 'src/app/application/use-cases/send-email.use-case';
import { UserCreatedEvent } from '../event/user-created.event';

@Controller('email')
export class EmailController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @EventPattern('user.created')
  async handleNotificationEvent(@Payload() payload: UserCreatedEvent) {
    const { email, emailVerificationToken } = payload;

    const verificationUrl = `https://yourapp.com/verify?emailVerificationToken=${emailVerificationToken}`;
    const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <tr>
        <td style="padding: 30px 40px;">
          <h2 style="color: #333;">Welcome to YourApp 👋</h2>
          <p style="color: #555; font-size: 16px;">
            Thank you for registering with us! Please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Verify Email
            </a>
          </div>
          <p style="color: #999; font-size: 14px;">
            If you did not create an account, please ignore this email.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f0f0f0; padding: 20px; text-align: center; color: #aaa; font-size: 12px;">
          &copy; ${new Date().getFullYear()} YourApp. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;

    await this.sendEmailUseCase.execute({
      to: email,
      subject: 'Verify your Email',
      html: html,
    });
  }
}
