import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fa214e703d260c",
    pass: "41c22ca080c8de"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <commercial@feedget.com>',
      to: 'Alvaro Sena <alvarosenacs.c@gmail.com>',
      subject,
      html: body,
    })
  }
}