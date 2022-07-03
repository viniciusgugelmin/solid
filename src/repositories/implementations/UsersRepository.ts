import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { db } from "../../application/database/prisma";
import bcrypt from "bcrypt";

export class UsersRepository implements IUsersRepository {
  constructor(private users = db.user) {}

  async findAll(): Promise<User[]> {
    return await this.users.findMany();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.users.findUnique({
      where: {
        email,
      },
    });

    return user || null;
  }

  async save(user: User): Promise<void> {
    await this.users.create({
      data: user,
    });
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
