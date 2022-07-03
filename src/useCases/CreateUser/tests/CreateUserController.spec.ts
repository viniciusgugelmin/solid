import {
  db,
  disconnectDB,
  truncateTable,
} from "../../../application/database/prisma";
import supertest from "supertest";
import { app } from "../../../application/api/app";
import { UsersFactory } from "../../../factories/implementations/UsersFactory";
import bcrypt from "bcrypt";

const usersFactory = new UsersFactory();

describe("CreateUserController", () => {
  beforeEach(async () => await truncateTable("users"));
  afterAll(async () => {
    await truncateTable("users");
    await disconnectDB();
  });

  it("should create a new user", async () => {
    const user = usersFactory.generate();

    const { status, body } = await supertest(app).post("/users").send(user);
    const users = await db.user.findMany();
    const [firstUser] = users;
    let isTheSamePassword = false;

    if (firstUser) {
      isTheSamePassword = bcrypt.compareSync(user.password, firstUser.password);
    }

    expect(status).toBe(201);
    expect(body).toEqual({});
    expect(users).toHaveLength(1);
    expect(firstUser).toHaveProperty("name", user.name);
    expect(firstUser).toHaveProperty("email", user.email);
    expect(isTheSamePassword).toBe(true);
  });
});
