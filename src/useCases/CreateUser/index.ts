import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { usersRepository } from "../../repositories/Users";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { usersHelper } from "../../helpers/Users";

const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  mailtrapMailProvider,
  usersHelper
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
