import { Request, Response } from "express";

interface IController {
  handle(req: Request, res: Response): Promise<Response>;
}

export { IController };
