import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO, ICreateUserUseCase } from "./CreateUserDTO";
import { IMailProvider } from "../../providers/IMailProvider";
import dotenv from "dotenv";

dotenv.config();

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);
    const hashedPassword = this.usersRepository.hashPassword(data.password);

    await this.usersRepository.save(
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
      body: `<p>Hello <strong>${data.name}</strong>!</p>`,
    });
  }
}
