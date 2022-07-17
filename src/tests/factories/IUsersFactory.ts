import { User } from "../../entities/User";

export interface IUsersFactory {
  generate(): User;
}
