import { IGetUsersUseCase } from "../../../../useCases/GetUsers/GetUsersDTO";
import { IController } from "../ControllerDTO";
import { Request, Response } from "express";
import { responseHandler } from "../../handlers";

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
