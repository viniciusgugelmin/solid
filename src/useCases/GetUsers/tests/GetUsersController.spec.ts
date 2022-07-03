import { app } from "../../../application/api/app";
import supertest from "supertest";
import {
  db,
  disconnectDB,
  truncateTable,
} from "../../../application/database/prisma";
import { UsersFactory } from "../../../factories/implementations/UsersFactory";
import bcrypt from "bcrypt";

const usersFactory = new UsersFactory();

describe("GetUsersController", () => {
  beforeEach(async () => await truncateTable("users"));
  afterAll(async () => {
    await truncateTable("users");
    await disconnectDB();
  });

  it("should return an empty list", async () => {
    const { status, body } = await supertest(app).get("/users").send();

    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it("should return a list of users", async () => {
    const user = await usersFactory.generateAndSave();

    const { status, body } = await supertest(app).get("/users").send();
    const [firstUser] = body;
    let isTheSamePassword = false;

    if (firstUser) {
      isTheSamePassword = bcrypt.compareSync(user.password, firstUser.password);
    }

    expect(status).toBe(200);
    expect(body).toHaveLength(1);
    expect(firstUser).toHaveProperty("name", user.name);
    expect(firstUser).toHaveProperty("email", user.email);
    expect(isTheSamePassword).toBe(true);
  });
});
