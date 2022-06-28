import { app } from "./application/api/app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3333;
const domain = process.env.DOMAIN;

app.listen(port, () => {
  console.log(`Server running on: ${domain}`);
});
