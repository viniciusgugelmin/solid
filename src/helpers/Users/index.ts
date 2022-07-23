import { UsersHelper } from "./UsersHelper";
import { usersRepository } from "../../repositories/Users";

const usersHelper = new UsersHelper(usersRepository);

export { usersHelper };
