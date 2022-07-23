import { usersRepository } from "../../repositories/Users";
import { GetUsersUseCase } from "./GetUsersUseCase";
import { GetUsersController } from "./GetUsersController";

const getUsersUseCase = new GetUsersUseCase(usersRepository);

const getUsersController = new GetUsersController(getUsersUseCase);

export { getUsersUseCase, getUsersController };
