import { queueName } from "./QueueDTO";
import { Channel, Message } from "amqplib";
import { IMessageBroker, messageBody } from "../MessageBrokerDTO";

export class AbstractQueue {
  name: queueName;

  constructor(name: queueName) {
    this.name = name;
  }

  protected fromMessage(message: Message): messageBody {
    return JSON.parse(message.content.toString());
  }

  protected async listen(
    messageBroker: IMessageBroker,
    channel: Channel,
    callback: (message) => Promise<void> | void
  ) {
    await messageBroker.consume(this.name, channel, async (message) => {
      await callback(message);
    });
  }
}
