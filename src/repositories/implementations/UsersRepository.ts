import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { db } from "../../application/database/prisma";

export class UsersRepository implements IUsersRepository {
  constructor(private users = db.user) {}

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
}
