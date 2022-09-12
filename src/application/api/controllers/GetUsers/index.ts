import { GetUsersController } from "./GetUsersController";
import { getUsersUseCase } from "../../../../useCases/GetUsers";

const getUsersController = new GetUsersController(getUsersUseCase);

export { getUsersController };
