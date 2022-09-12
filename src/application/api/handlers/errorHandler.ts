import { AppError } from "../../../errors/AppError";
import { Request, Response, NextFunction } from "express";
import { responseHandler, logErrorHandler } from "./";

export function errorHandler(
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.status).json(responseHandler(err));
  }

  logErrorHandler(err);

  res
    .status(500)
    .send(responseHandler({ message: "Internal server error", status: 500 }));
}
