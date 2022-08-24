import { User } from "../../../entities/User";
import { faker } from "@faker-js/faker";
import { IUsersFactory } from "./UsersDTO";
import { IUsersRepository } from "../../../repositories/Users/UsersDTO";
import { IUsersHelper } from "../../../helpers/Users/UsersDTO";

export class UsersFactory implements IUsersFactory {
  constructor(
    private usersRepository: IUsersRepository,
    private usersHelper: IUsersHelper
  ) {}

  public generate(): User {
    return new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "123",
    });
  }

  public generateMany(amount: number): User[] {
    const users: User[] = [];

    for (let i = 0; i < amount; i++) {
      users.push(this.generate());
    }

    return users;
  }

  public async save(users: User[]): Promise<void> {
    const usersMapped = users.map((user) => {
      const hashedPassword = this.usersHelper.hashPassword(user.password);

      return {
        ...user,
        password: hashedPassword,
      };
    });

    await this.usersRepository.saveMany(usersMapped);
  }
}
