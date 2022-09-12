import { MailProvider } from "./MailProvider";
import { messageBroker } from "../../application/config/MessageBroker";

const mailProvider = new MailProvider(messageBroker);

export { mailProvider };
