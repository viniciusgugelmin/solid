import { User } from "../../entities/User";
import { IRepository } from "../RepositoryDTO";

type IUsersRepository = IRepository<User> & {
  findByEmail(email: string): Promise<User> | null;
};

export { IUsersRepository };
