import { Channel, connect, Connection } from "amqplib";
import { IMessageBroker, messageBody } from "./MessageBrokerDTO";
import { IQueue } from "./Queues/QueueDTO";

export class AbstractMessageBroker {
  private conn: Connection;
  protected channel: Channel;
  protected queues: Array<{ queue: IQueue; name: string }> = [];

  constructor(protected uri: string) {}

  protected async init() {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  protected async listenQueues(messageBroker: IMessageBroker) {
    for (const { queue, name } of this.queues) {
      await this.channel.assertQueue(name);
      await queue.listen(messageBroker, this.channel);
    }
  }

  protected static toMessage(body: messageBody): Buffer {
    return Buffer.from(JSON.stringify(body));
  }
}
