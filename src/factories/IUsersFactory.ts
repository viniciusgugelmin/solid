import { User } from "../entities/User";

export interface IUsersFactory {
  generate(): User;

  save(user: User): Promise<User>;

  generateAndSave(): Promise<User>;
}
