import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../../useCases/CreateUser/CreateUserUseCase";
import { IController } from "../ControllerDTO";
import { responseHandler } from "../../handlers";

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
