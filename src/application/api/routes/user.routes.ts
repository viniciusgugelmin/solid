import { Router } from "express";
import { createUserController } from "../../../useCases/CreateUser";
import { getUsersController } from "../../../useCases/GetUsers";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  return getUsersController.handle(req, res);
});

userRouter.post("/", (req, res) => {
  return createUserController.handle(req, res);
});

export { userRouter };
