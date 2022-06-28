import { Router } from "express";
import { userRouter } from "./userRputer";

const index = Router();

index.use("/users", userRouter);

export { index };
