import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { IController } from "../../application/api/interfaces/IController";
import { responseHandler } from "../../application/api/handlers/responseHandler";

export class CreateUserController implements IController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    await this.createUserUseCase.execute({ name, email, password });

    return res
      .status(201)
      .json(responseHandler({ message: "User created", status: 201 }));
  }
}
