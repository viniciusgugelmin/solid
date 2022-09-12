import nodemailer from "nodemailer";
import { IMailProvider, IMessage } from "./MailDTO";
import { IMessageBroker } from "../../application/config/MessageBroker/MessageBrokerDTO";

export class MailProvider implements IMailProvider {
  private transporter;

  constructor(private messageBroker: IMessageBroker) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1925ddf5cf84a7",
        pass: "9024cd40218724",
      },
    });
  }

  async sendMail(message: IMessage, shouldQueue = true): Promise<void> {
    if (shouldQueue) {
      await this.messageBroker.sendToQueue("email", {
        from: "system",
        to: "user-email",
        subject: message.subject,
        body: message,
        date: new Date(),
      });
      return;
    }

    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
