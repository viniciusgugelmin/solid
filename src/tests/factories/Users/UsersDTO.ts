import { User } from "../../../entities/User";

interface IUsersFactory {
  generate(): User;

  generateMany(amount: number): User[];

  save(users: User[]): Promise<void>;
}

export { IUsersFactory };
