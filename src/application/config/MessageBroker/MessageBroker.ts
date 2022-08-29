import { Channel, connect, Connection, Message } from "amqplib";
import { IMessageBroker } from "./MessageBrokerDTO";
import dotenv from "dotenv";
import { emailQueue } from "./Queues/Email";
import { IQueue } from "./Queues/QueueDTO";

dotenv.config();

export class MessageBroker implements IMessageBroker {
  private conn: Connection;
  private channel: Channel;
  private readonly queues: Array<{ queue: IQueue; name: string }> = [];

  constructor(private uri: string) {
    this.queues = [{ queue: emailQueue, name: "email" }];
  }

  async init() {
    const instance = new MessageBroker(process.env.MESSAGE_BROKER_URI);

    await this.startConnection();

    for (const { queue, name } of this.queues) {
      await this.channel.assertQueue(name);
      await queue.listen(instance, this.channel);
    }
  }

  private async startConnection(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async sendToQueue(queueName: string, body: any): Promise<boolean> {
    return this.channel.sendToQueue(queueName, Buffer.from(body));
  }

  async consume(
    queue: string,
    channel: Channel,
    callback: (message: Message) => void
  ) {
    await channel.consume(queue, (message: Message) => {
      callback(message);
      this.channel.ack(message);
    });
  }
}
