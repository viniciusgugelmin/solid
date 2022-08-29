import { database } from "../../application/config/Database";
import { UsersRepository } from "./UsersRepository";

const usersRepository = new UsersRepository(database);

export { usersRepository };
