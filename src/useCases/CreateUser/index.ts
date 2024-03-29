import { usersRepository } from "../../repositories";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { usersHelper } from "../../helpers";
import { mailProvider, templateEngineProvider } from "../../providers";

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  mailProvider,
  usersHelper
);

export { createUserUseCase };
