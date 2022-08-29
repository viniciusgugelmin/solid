// @ts-ignore
import supertest from "supertest";
import { Server } from "../../../../application/api/Server";
import { database } from "../../../../application/config/Database";
import { usersFactory } from "../../../../tests/factories/Users";

describe("GetUsersController", () => {
  const server = new Server();
  const app = server.app;

  beforeEach(async () => await database.truncateTable("users"));
  afterAll(async () => {
    await database.truncateTable("users");
    await database.disconnect();
  });

  it("should list all users", async () => {
    const users = usersFactory.generateMany(3);
    await usersFactory.save(users);

    const { status, body } = await supertest(app).get("/api/users").send();

    expect(status).toBe(200);
    expect(body).toStrictEqual(
      expect.objectContaining({
        message: "Users retrieved",
        status: "OK",
        statusCode: 200,
        data: expect.any(Array),
      })
    );

    expect(body.data).toHaveLength(3);
    expect(body.data[0]).toStrictEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: users[0].name,
        email: users[0].email,
        password: expect.any(String),
      })
    );
  });
});
