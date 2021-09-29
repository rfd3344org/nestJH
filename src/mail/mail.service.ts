import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user : any = 1, token : string = '1') {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: 'rfd3344@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './hello', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: 324,
      },
    });
  }
}