import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailReq } from './dtos/req/send-email.dto';
import { SendEmailRes } from './dtos/res/send-email.dto';

@Injectable()
export class EmailUseCase {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(dto: SendEmailReq): Promise<SendEmailRes> {
    const { to, subject, html } = dto;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject,
      html: html,
    });

    return {
      to,
      subject,
      html,
    };
  }
}
