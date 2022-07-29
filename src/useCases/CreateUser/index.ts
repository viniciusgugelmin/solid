import { usersRepository } from "../../repositories/Users";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { usersHelper } from "../../helpers/Users";
import { mailProvider } from "../../providers/Mail";

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  mailProvider,
  usersHelper
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
