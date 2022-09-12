import {WelcomeEmailViewDTO} from "./WelcomeEmailViewDTO";
import {IView} from "../../ViewDTO";

export class WelcomeEmailView implements IView {
  templateDir = "emails/Welcome/welcome-email.hbs";

  constructor(public variables: WelcomeEmailViewDTO) {
  }
}
