import { app } from "../../../application/api/app";
import supertest from "supertest";
import {
  db,
  disconnectDB,
  truncateTable,
} from "../../../application/database/prisma";
import { UsersFactory } from "../../../factories/implementations/UsersFactory";
import { UsersRepository } from "../../../repositories/implementations/UsersRepository";

const usersRepository = new UsersRepository();
const usersFactory = new UsersFactory(usersRepository);

describe("GetUsersController", () => {
  beforeAll(async () => {
    let d = new Date().toUTCString();
    console.log("init get", d);
  });
  beforeEach(async () => {
    await db.user.deleteMany({
      where: {},
    });
  });
  afterAll(async () => {
    let d = new Date().toUTCString();
    console.log("end create", d);
    await disconnectDB();
  });

  it("should return an empty list of users", async () => {
    const { status, body } = await supertest(app).get("/users").send();

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: "Users retrieved",
        status: "OK",
        statusCode: 200,
      })
    );
    expect(body.data).toHaveLength(0);
  });

  it("should return a list of users", async () => {
    const user = await usersFactory.generateAndSave();

    const { status, body } = await supertest(app).get("/users").send();
    const firstUser = body.data?.length > 0 ? body.data[0] : null;
    let isTheSamePassword = false;

    if (firstUser) {
      isTheSamePassword = usersRepository.comparePassword(
        user.password,
        firstUser.password
      );
    }

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: "Users retrieved",
        status: "OK",
        statusCode: 200,
      })
    );
    expect(body.data).toHaveLength(1);
    expect(firstUser).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
      })
    );
    expect(isTheSamePassword).toBe(true);
  });
});
