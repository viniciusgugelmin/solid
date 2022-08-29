import { IUsersRepository } from "../../repositories/Users/UsersDTO";
import { IGetUsersUseCase } from "./GetUsersDTO";
import { User } from "../../entities/User";
import dotenv from "dotenv";

dotenv.config();

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
