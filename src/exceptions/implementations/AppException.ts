import { IAppException } from "../IAppException";

export class AppException implements IAppException {
  readonly message: string;
  readonly status: number;

  constructor(message: string, status: number = 400) {
    this.message = message;
    this.status = status;
  }
}
