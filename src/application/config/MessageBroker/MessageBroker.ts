import { Channel, Message } from "amqplib";
import { IMessageBroker, messageBody } from "./MessageBrokerDTO";
import { AbstractMessageBroker } from "./AbstractMessageBroker";
import { IQueue, queueName } from "./Queues/QueueDTO";

export class MessageBroker
  extends AbstractMessageBroker
  implements IMessageBroker
{
  constructor(messageBrokerURI: string) {
    super(messageBrokerURI);
  }

  async init() {
    await super.init();
  }

  async getQueues(queues: IQueue[]) {
    for (const queue of queues) {
      if (!queue) continue;

      this.queues.push({ queue, name: queue.name });
    }

    await this.listenQueues(this);
  }

  async sendToQueue(queueName: queueName, body: messageBody): Promise<boolean> {
    return this.channel.sendToQueue(queueName, MessageBroker.toMessage(body));
  }

  async consume(
    queue: queueName,
    channel: Channel,
    callback: (message: Message) => void
  ) {
    await channel.consume(queue, (message: Message) => {
      callback(message);
      channel.ack(message);
    });
  }
}
