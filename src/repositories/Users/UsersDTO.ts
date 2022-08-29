import { User } from "../../entities/User";
import { IRepository } from "../IRepository";

type IUsersRepository = IRepository<User> & {
  findByEmail(email: string): Promise<User> | null;
};

export { IUsersRepository };
