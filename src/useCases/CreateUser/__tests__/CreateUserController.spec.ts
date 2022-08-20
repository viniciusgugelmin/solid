import supertest from "supertest";
import { Server } from "../../../application/api/Server";
import { createUserUseCase } from "../index";
import { usersFactory } from "../../../tests/factories/Users";
import { Database } from "../../../application/config/Database";

describe("CreateUserController", () => {
  const server = new Server();
  const app = server.app;

  const database = new Database();

  beforeEach(async () => await database.truncateTable("users"));
  afterAll(async () => await database.disconnect());

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
