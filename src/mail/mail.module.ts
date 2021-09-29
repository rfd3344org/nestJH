
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as _ from 'lodash';

import { MailService } from './mail.service';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM } = process.env;

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      transport: {
        host: MAIL_HOST,
        port: _.parseInt(MAIL_PORT),
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS
        }
      },
      defaults: {
        from: MAIL_FROM,
      },
      template: {
        dir: __dirname + '/template',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
