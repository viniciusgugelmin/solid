import fs from "fs";

const envsSetup = [".env", ".env.development", ".env.test"];

for (const env of envsSetup) {
  if (fs.existsSync(env)) continue;

  fs.copyFileSync(`.env.example`, env);
}
