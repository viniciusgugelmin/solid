import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { GetUsersUseCase } from "./GetUsersUseCase";
import { GetUsersController } from "./GetUsersController";

const usersRepository = new UsersRepository();

const getUsersUseCase = new GetUsersUseCase(usersRepository);

const getUsersController = new GetUsersController(getUsersUseCase);

export { getUsersUseCase, getUsersController };
