import pkg from "@prisma/client";

export class Database {
  readonly db: pkg.PrismaClient;

  constructor() {
    const { PrismaClient } = pkg;
    this.db = new PrismaClient();
  }

  async disconnect() {
    await this.db.$disconnect();
  }

  async truncateTable(table: string) {
    await this.db.$executeRawUnsafe(`TRUNCATE TABLE ${table}`);
  }
}
