import supertest from "supertest";
import { server } from "../../../application/api/server";
import { UsersFactory } from "../../../tests/factories/implementations/UsersFactory";
import { UsersRepository } from "../../../repositories/implementations/UsersRepository";
import { createUserUseCase } from "../index";
import {
  disconnectDB,
  truncateTable,
} from "../../../application/database/prisma";

const usersRepository = new UsersRepository();
const usersFactory = new UsersFactory(usersRepository);
const app = server.app;

describe("CreateUserController", () => {
  beforeEach(async () => await truncateTable("users"));
  afterAll(async () => await disconnectDB());

  it("should return a response", async () => {
    jest
      .spyOn(createUserUseCase, "execute")
      .mockImplementationOnce(async () => {});

    const user = usersFactory.generate();
    const { status, body } = await supertest(app).post("/api/users").send(user);

    expect(status).toBe(201);
    expect(body).toStrictEqual(
      expect.objectContaining({
        message: "User created",
        status: "OK",
        statusCode: 201,
        data: {},
      })
    );
  });
});
