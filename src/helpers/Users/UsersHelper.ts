import { IUsersHelper } from "./UsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppException } from "../../exceptions/implementations/AppException";
import bcrypt from "bcrypt";

export class UsersHelper implements IUsersHelper {
  constructor(private usersRepository: IUsersRepository) {}

  async verifyIfEmailIsAlreadyInUse(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppException("Email is already in use");
    }
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
