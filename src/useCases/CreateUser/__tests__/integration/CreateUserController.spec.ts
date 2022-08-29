import supertest from "supertest";
import { Server } from "../../../../application/api/Server";
import { usersFactory } from "../../../../tests/factories/Users";
import { database } from "../../../../application/config/Database";
import { MailProvider } from "../../../../providers/Mail/MailProvider";
import { usersRepository } from "../../../../repositories/Users";
import { usersHelper } from "../../../../helpers/Users";

describe("CreateUserController", () => {
  const server = new Server();
  const app = server.app;

  beforeEach(async () => {
    await database.truncateTable("users");
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await database.truncateTable("users");
    await database.disconnect();
  });

  it("should create an user", async () => {
    jest
      .spyOn(MailProvider.prototype, "sendMail")
      .mockImplementation(async () => {});

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

    const users = await usersRepository.findAll();
    const isPasswordHashed = usersHelper.comparePassword(
      user.password,
      users[0].password
    );

    expect(MailProvider.prototype.sendMail).toHaveBeenCalledTimes(1);
    expect(users).toHaveLength(1);
    expect(users[0]).toStrictEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: user.name,
        email: user.email,
        password: expect.any(String),
      })
    );
    expect(isPasswordHashed).toBe(true);
  });
});
