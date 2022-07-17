import { server } from "../../../application/api/server";
import supertest from "supertest";
import {
  disconnectDB,
  truncateTable,
} from "../../../application/database/prisma";
import { getUsersUseCase } from "../index";

const app = server.app;

describe("GetUsersController", () => {
  beforeEach(async () => await truncateTable("users"));
  afterAll(async () => await disconnectDB());

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
