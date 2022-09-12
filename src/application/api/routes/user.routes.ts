import { Router } from "express";
import { createUserController, getUsersController } from "../controllers";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  return getUsersController.handle(req, res);
});

userRouter.post("/", (req, res) => {
  return createUserController.handle(req, res);
});

export { userRouter };
