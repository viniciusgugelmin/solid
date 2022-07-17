import { AppException } from "../../../exceptions/implementations/AppException";
import { Request, Response, NextFunction } from "express";
import { responseHandler } from "./responseHandler";
import { logErrorHandler } from "./logErrorHandler";

export function errorHandler(
  err: AppException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppException) {
    return res.status(err.status).json(responseHandler(err));
  }

  logErrorHandler(err);

  res
    .status(500)
    .send(responseHandler({ message: "Internal server error", status: 500 }));
}
