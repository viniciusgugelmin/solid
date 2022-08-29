import { Channel, Message } from "amqplib";

interface IMessageBroker {
  init(): Promise<void>;

  sendToQueue(queue: string, body: any): Promise<boolean>;

  consume(
    queueName: string,
    channel: Channel,
    callback: (message: Message) => void
  ): Promise<void>;
}

export { IMessageBroker };
