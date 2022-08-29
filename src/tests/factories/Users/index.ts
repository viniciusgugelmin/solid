import { UsersFactory } from "./UsersFactory";
import { usersRepository } from "../../../repositories/Users";
import { usersHelper } from "../../../helpers/Users";

const usersFactory = new UsersFactory(usersRepository, usersHelper);

export { usersFactory };
