import { User } from "../../entities/User";

interface IGetUsersUseCase {
  execute(): Promise<User[]>;
}

export { IGetUsersUseCase };
