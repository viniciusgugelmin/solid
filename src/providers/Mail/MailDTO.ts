import { IView } from "../../views/ViewDTO";

type IMailAddress = {
  name: string;
  email: string;
};

type IMailMessage = {
  to: IMailAddress;
  from: IMailAddress;
  subject: string;
  view: IView;
};

interface IMailProvider {
  sendMail(message: IMailMessage, shouldQueue?: boolean): Promise<void>;
}

export { IMailMessage, IMailProvider };
