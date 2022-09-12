import { UsersFactory } from "./UsersFactory";
import { usersRepository } from "../../../repositories";
import { usersHelper } from "../../../helpers";

const usersFactory = new UsersFactory(usersRepository, usersHelper);

export { usersFactory };
