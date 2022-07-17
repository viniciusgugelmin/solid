interface IUsersHelper {
  verifyIfEmailIsAlreadyInUse(email: string): Promise<void>;

  hashPassword(password: string): string;

  comparePassword(password: string, hash: string): boolean;
}

export { IUsersHelper };
