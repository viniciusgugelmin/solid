import { usersRepository } from "../../repositories";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { usersHelper } from "../../helpers";
import { mailProvider } from "../../providers";

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  mailProvider,
  usersHelper
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
