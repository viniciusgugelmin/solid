import {
  disconnectDB,
  truncateTable,
} from "../../../application/database/prisma";
import supertest from "supertest";
import { app } from "../../../application/api/app";
import { UsersFactory } from "../../../factories/implementations/UsersFactory";
import { UsersRepository } from "../../../repositories/implementations/UsersRepository";

const usersRepository = new UsersRepository();
const usersFactory = new UsersFactory(usersRepository);

describe("CreateUserController", () => {
  beforeEach(async () => await truncateTable("users"));
  afterAll(async () => {
    await truncateTable("users");
    await disconnectDB();
  });

  it("should create a new user", async () => {
    const user = usersFactory.generate();

    const { status, body } = await supertest(app).post("/users").send(user);
    const users = await usersRepository.findAll();
    const [firstUser] = users;
    let isTheSamePassword = false;

    if (firstUser) {
      isTheSamePassword = usersRepository.comparePassword(
        user.password,
        firstUser.password
      );
    }

    expect(status).toBe(201);
    expect(body).toEqual({});
    expect(users).toHaveLength(1);
    expect(firstUser).toHaveProperty("name", user.name);
    expect(firstUser).toHaveProperty("email", user.email);
    expect(isTheSamePassword).toBe(true);
  });
});
