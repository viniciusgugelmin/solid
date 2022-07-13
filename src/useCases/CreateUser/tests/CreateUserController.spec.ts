import {
  db,
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
  beforeAll(async () => {
    let d = new Date().toUTCString();
    console.log("init create", d);
  });
  beforeEach(async () => {
    console.log("beforeEach create");
    await db.user.deleteMany({
      where: {},
    });
    //await db.$executeRaw`TRUNCATE TABLE users`;
  });
  afterAll(async () => {
    let d = new Date().toUTCString();
    console.log("end create", d);
    await disconnectDB();
  });

  it("should create a new user", async () => {
    const user = usersFactory.generate();
    console.log(user);
    const { status, body } = await supertest(app).post("/users").send(user);
    const users = await usersRepository.findAll();
    console.log("users", users);
    const [firstUser] = users;
    let isTheSamePassword = false;

    if (firstUser) {
      isTheSamePassword = usersRepository.comparePassword(
        user.password,
        firstUser.password
      );
    }

    expect(status).toBe(201);
    /*expect(body).toEqual(
                  expect.objectContaining({
                    message: "User created",
                    status: "OK",
                    statusCode: 201,
                    data: {},
                  })
                );*/
    expect(users).toHaveLength(1);
    expect(firstUser).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
      })
    );
    expect(isTheSamePassword).toBe(true);
  });
});
