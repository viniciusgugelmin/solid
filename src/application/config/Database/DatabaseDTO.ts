import pkg from "@prisma/client";

interface IDatabase {
  db: pkg.PrismaClient;

  disconnect(): Promise<void>;

  truncateTable(table: string): Promise<void>;
}

export { IDatabase };
