import { IMessageBroker } from "../MessageBrokerDTO";
import { Channel } from "amqplib";

type queueName = "email";

interface IQueue {
  name: queueName;

  listen(messageBroker: IMessageBroker, channel: Channel): Promise<void>;
}

export { IQueue, queueName };
