import { MailProvider } from "./MailProvider";
import { messageBroker } from "../../application/config/MessageBroker";
import { templateEngineProvider } from "../TemplateEngine";

const mailProvider = new MailProvider(messageBroker, templateEngineProvider);

export { mailProvider };
