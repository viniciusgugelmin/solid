import { Channel, Message } from "amqplib";
import { queueName } from "./Queues/QueueDTO";
import { IMessage } from "../../../providers/Mail/MailDTO";

type messageBody = {
  from: number | "system";
  to: number | "user-email" | "everyone" | "system";
  subject: string;
  body: IMessage | string;
  date: Date;
};

interface IMessageBroker {
  init(): Promise<void>;

  sendToQueue(queue: queueName, body: messageBody): Promise<boolean>;

  consume(
    queueName: queueName,
    channel: Channel,
    callback: (message: Message) => void
  ): Promise<void>;
}

export { IMessageBroker, messageBody };
