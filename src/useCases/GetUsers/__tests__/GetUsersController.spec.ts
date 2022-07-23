import { Server } from "../../../application/api/Server";
import supertest from "supertest";
import { Database } from "../../../application/database/Database";
import { getUsersUseCase } from "../index";

describe("GetUsersController", () => {
  const server = new Server();
  const app = server.app;

  const database = new Database();

  beforeEach(async () => await database.truncateTable("users"));
  afterAll(async () => await database.disconnect());

  it("should return a response", async () => {
    jest
      .spyOn(getUsersUseCase, "execute")
      .mockImplementationOnce(async () => []);

    const { status, body } = await supertest(app).get("/api/users").send();

    expect(status).toBe(200);
    expect(body).toStrictEqual(
      expect.objectContaining({
        message: "Users retrieved",
        status: "OK",
        statusCode: 200,
        data: [],
      })
    );
  });
});
