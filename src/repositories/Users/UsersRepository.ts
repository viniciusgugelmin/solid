import {IUsersRepository} from "./UsersDTO";
import {User} from "../../entities/User";
import {Database} from "../../application/config/Database";

export class UsersRepository implements IUsersRepository {
  private readonly database = new Database();
  private readonly users = this.database.db.user;

  async findAll(): Promise<User[]> {
    return await this.users.findMany();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.users.findUnique({
      where: {
        email,
      },
    });
  }

  async save(user: User): Promise<void> {
    await this.users.create({
      data: user,
    });
  }

  async saveMany(users: User[]): Promise<void> {
    await this.users.createMany({
      data: users,
    });
  }
}
