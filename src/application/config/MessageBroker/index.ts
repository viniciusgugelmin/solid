import { MessageBroker } from "./MessageBroker";
import dotenv from "dotenv";

dotenv.config();

const messageBrokerURI = process.env.MESSAGE_BROKER_URI;
const messageBroker = new MessageBroker(messageBrokerURI);

export { messageBroker };
