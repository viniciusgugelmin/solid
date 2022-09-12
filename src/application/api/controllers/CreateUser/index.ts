import { CreateUserController } from "./CreateUserController";
import { createUserUseCase } from "../../../../useCases/CreateUser";

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
