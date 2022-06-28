import pkg from "@prisma/client";

const { PrismaClient: Prisma } = pkg;
const db = new Prisma();

export { db };
