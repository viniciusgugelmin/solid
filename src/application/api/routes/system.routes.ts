import { Router } from "express";

const systemRouter = Router();

systemRouter.get("/", (req, res) => {
  res.send("OK");
});

export { systemRouter };
