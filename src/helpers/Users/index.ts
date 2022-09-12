import { UsersHelper } from "./UsersHelper";
import { usersRepository } from "../../repositories";

const usersHelper = new UsersHelper(usersRepository);

export { usersHelper };
