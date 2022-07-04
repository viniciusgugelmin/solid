import { User } from "../../entities/User";
import { faker } from "@faker-js/faker";
import { IUsersFactory } from "../IUsersFactory";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class UsersFactory implements IUsersFactory {
  constructor(private usersRepository: IUsersRepository) {}

  public generate(): User {
    return new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "123",
    });
  }

  public async save(user: User): Promise<User> {
    const hashedPassword = this.usersRepository.hashPassword(user.password);

    await this.usersRepository.save(
      Object.assign({}, user, { password: hashedPassword })
    );

    return user;
  }

  public async generateAndSave(): Promise<User> {
    const user = this.generate();
    await this.save(user);

    return user;
  }
}
