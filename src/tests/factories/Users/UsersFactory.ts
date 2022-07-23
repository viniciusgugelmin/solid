import { User } from "../../../entities/User";
import { faker } from "@faker-js/faker";
import { IUsersFactory } from "./UsersDTO";

export class UsersFactory implements IUsersFactory {
  constructor() {}

  public generate(): User {
    return new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "123",
    });
  }
}
