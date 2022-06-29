import { Router } from "express";
import { createUserController } from "../../../useCases/CreateUser";

const userRouter = Router();

userRouter.post("/", (req, res) => {
  return createUserController.handle(req, res);
});

export { userRouter };
