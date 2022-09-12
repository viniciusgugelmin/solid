import { IMessageBroker } from "../../MessageBrokerDTO";
import { Channel } from "amqplib";
import { IQueue } from "../QueueDTO";
import { AbstractQueue } from "../AbstractQueue";
import { IMailProvider, IMessage } from "../../../../../providers/Mail/MailDTO";

export class EmailQueue extends AbstractQueue implements IQueue {
  constructor(private mailProvider: IMailProvider) {
    super("email");
  }

  async listen(messageBroker: IMessageBroker, channel: Channel) {
    await super.listen(messageBroker, channel, async (message) => {
      const emailMessage = this.fromMessage(message);
      await this.mailProvider.sendMail(emailMessage.body as IMessage, false);
    });
  }
}
