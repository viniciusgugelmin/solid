import { app } from "./app.js";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const port = process.env.PORT || 3333;
const domain = process.env.DOMAIN;

app.listen(port, () => {
  console.log(chalk.green.bold(`Server running on: ${domain}`));
});
