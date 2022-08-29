import { IMessageBroker } from "../../MessageBrokerDTO";
import { Channel } from "amqplib";
import { IQueue } from "../QueueDTO";

export class EmailQueue implements IQueue {
  async listen(messageBroker: IMessageBroker, channel: Channel) {
    await messageBroker.consume("email", channel, (message) => {
      console.log(message.content.toString());
    });
  }
}
