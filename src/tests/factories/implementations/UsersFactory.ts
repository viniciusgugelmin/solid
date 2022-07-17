import { User } from "../../../entities/User";
import { faker } from "@faker-js/faker";
import { IUsersFactory } from "../IUsersFactory";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class UsersFactory implements IUsersFactory {
  constructor(private usersRepository: IUsersRepository) {}

  public generate(): User {
    return new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "123",
    });
  }
}
