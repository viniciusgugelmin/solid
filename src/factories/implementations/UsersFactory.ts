import {User} from "../../entities/User";
import {db} from "../../application/database/prisma";
import {faker} from "@faker-js/faker";
import {IUsersFactory} from "../IUsersFactory";
import bcrypt from "bcrypt";

export class UsersFactory implements IUsersFactory {
  public generate(): User {
    return new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "123",
    });
  }

  public async save(user: User): Promise<User> {
    const hashedPassword = bcrypt.hashSync(user.password, 10);

    await db.user.create({
      data: Object.assign({}, user, {password: hashedPassword}),
    });

    return user;
  }

  public async generateAndSave(): Promise<User> {
    const user = this.generate();
    await this.save(user);

    return user;
  }
}
