import { User } from "../entities/User";

export interface IUsersRepository {
  findAll(): Promise<User[]>;

  findByEmail(email: string): Promise<User> | null;

  save(user: User): Promise<void>;

  hashPassword(password: string): string;

  comparePassword(password: string, hash: string): boolean;
}
