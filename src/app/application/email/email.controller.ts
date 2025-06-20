import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserCreatedEvent } from 'src/app/infra/messaging/kafka/event/user-created.event';
import { EmailUseCase } from './email.usecase';

@Controller('email')
export class EmailController {
  constructor(private readonly emailUseCase: EmailUseCase) {}

  @EventPattern('user.created')
  async handleNotificationEvent(@Payload() payload: UserCreatedEvent) {
    const { email, emailVerificationToken } = payload;

    const verificationUrl = `${process.env.PROJECT_HUB_WEB_URL}/verify-email-process?verifyEmailToken=${emailVerificationToken}`;
    const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color: #f9fafb; padding: 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);">
      <tr>
        <td style="padding: 40px 40px 10px 40px; text-align: center;">
          <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">Welcome to Project Hub 👋</h1>
          <p style="color: #4b5563; font-size: 16px; margin: 0;">
            Thank you for signing up. Please verify your email to get started!
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px 40px; text-align: center;">
          <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(to right, #4F46E5, #6366F1); color: white; padding: 14px 28px; font-size: 16px; border-radius: 8px; text-decoration: none; font-weight: 500;">
            Verify Email
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 40px 40px 40px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px;">
            If you didn’t create an account, no further action is required.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
          &copy; ${new Date().getFullYear()} YourApp. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;

    await this.emailUseCase.sendEmail({
      to: email,
      subject: 'Verify your Email',
      html: html,
    });
  }
}
