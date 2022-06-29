import { IGetUsersUseCase } from "./GetUsersDTO";
import { IController } from "../../application/api/IController";
import { Request, Response } from "express";

export class GetUsersController implements IController {
  constructor(private getUsersUseCase: IGetUsersUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getUsersUseCase.execute();

      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).send({
        message: e.message || "Unexpected error",
      });
    }
  }
}
