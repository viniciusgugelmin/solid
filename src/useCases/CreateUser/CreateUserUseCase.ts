import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/Users/UsersDTO";
import { ICreateUserRequestDTO, ICreateUserUseCase } from "./CreateUserDTO";
import dotenv from "dotenv";
import { IUsersHelper } from "../../helpers/Users/UsersDTO";
import { IMailProvider } from "../../providers/Mail/MailDTO";
import { WelcomeEmailView } from "../../views/emails/Welcome/WelcomeEmailView";

dotenv.config();

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private usersHelper: IUsersHelper
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    await this.usersHelper.verifyIfEmailIsAlreadyInUse(data.email);

    const user = new User(data);
    const hashedPassword = this.usersHelper.hashPassword(data.password);

    await this.usersRepository.create(
      Object.assign({}, user, { password: hashedPassword })
    );

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: process.env.MAIL_NAME,
        email: process.env.MAIL_ADDRESS,
      },
      subject: "Welcome!",
      view: new WelcomeEmailView({
        userName: data.name,
      }),
    });
  }
}
