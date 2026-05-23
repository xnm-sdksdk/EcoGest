import { config } from "dotenv";
import { afterAll, afterEach, beforeAll } from "vitest";

config({ path: ".env.test" });

const { AppDataSource } = await import("../src/config/data-source");

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

afterEach(async () => {
  const entities = AppDataSource.entityMetadatas;
  const tableNames = entities.map((e) => `"${e.tableName}"`).join(", ");
  await AppDataSource.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE`);
});

afterAll(async () => {
  await AppDataSource.destroy();
});
