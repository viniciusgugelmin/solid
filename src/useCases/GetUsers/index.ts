import { usersRepository } from "../../repositories";
import { GetUsersUseCase } from "./GetUsersUseCase";

const getUsersUseCase = new GetUsersUseCase(usersRepository);

export { getUsersUseCase };
