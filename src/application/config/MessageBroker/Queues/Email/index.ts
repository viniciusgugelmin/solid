import { mailProvider } from "../../../../../providers";
import { EmailQueue } from "./EmailQueue";

const emailQueue = new EmailQueue(mailProvider);

export { emailQueue };
