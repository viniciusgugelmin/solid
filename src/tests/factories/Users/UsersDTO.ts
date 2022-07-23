import { User } from "../../../entities/User";

interface IUsersFactory {
  generate(): User;
}

export { IUsersFactory };
