import { UsersHelper } from "./UsersHelper";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

const usersRepository = new UsersRepository();
const usersHelper = new UsersHelper(usersRepository);

export { usersHelper };
