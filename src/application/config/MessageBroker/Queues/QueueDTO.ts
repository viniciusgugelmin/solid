import {IMessageBroker} from "../MessageBrokerDTO";
import {Channel} from "amqplib";

interface IQueue {
    listen(messageBroker: IMessageBroker, channel: Channel): Promise<void>;
}

export { IQueue };
