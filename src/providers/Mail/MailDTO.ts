interface IAddress {
  name: string;
  email: string;
}

interface IMessage {
  to: IAddress;
  from: IAddress;
  subject: string;
  body: string;
}

interface IMailProvider {
  sendMail(message: IMessage, shouldQueue?: boolean): Promise<void>;
}

export { IMessage, IMailProvider };
