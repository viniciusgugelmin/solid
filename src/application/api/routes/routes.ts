import { Router } from "express";
import { userRouter } from "./user.routes";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("OK");
});

routes.use("/users", userRouter);

export { routes };
