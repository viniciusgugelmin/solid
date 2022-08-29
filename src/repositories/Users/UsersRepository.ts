import {IUsersRepository} from "./UsersDTO";
import {User} from "../../entities/User";
import {IDatabase} from "../../application/config/Database/DatabaseDTO";

export class UsersRepository implements IUsersRepository {
  private readonly users = this.database.db.user;

  constructor(private database: IDatabase) {
  }

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

  async create(user: User): Promise<void> {
    await this.users.create({
      data: user,
    });
  }

  async createMany(users: User[]): Promise<void> {
    await this.users.createMany({
      data: users,
    });
  }
}
