import pkg from "@prisma/client";

const { PrismaClient: Prisma } = pkg;
const db = new Prisma();

async function disconnectDB() {
  await db.$disconnect();
}

async function truncateTable(table: string) {
  await db.$executeRawUnsafe(`TRUNCATE TABLE ${table}`);
}

export { db, disconnectDB, truncateTable };
