import { Server } from "./application/api/Server";
import {
  MessageBroker,
  messageBrokerURI,
} from "./application/config/MessageBroker";

const server = new Server();
const messageBroker = new MessageBroker(messageBrokerURI);

server.init();
messageBroker.init().then(() => {
  console.log("Message broker is running");
});
