import { IGetUsersUseCase } from "./GetUsersDTO";
import { IController } from "../../application/api/interfaces/IController";
import { Request, Response } from "express";
import { responseHandler } from "../../application/api/handlers/responseHandler";

export class GetUsersController implements IController {
  constructor(private getUsersUseCase: IGetUsersUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const users = await this.getUsersUseCase.execute();

    return res.status(200).json(
      responseHandler({
        message: "Users retrieved",
        status: 200,
        data: users,
      })
    );
  }
}
