import { config } from "dotenv";
import { afterAll, afterEach, beforeAll } from "vitest";
import jwt from "jsonwebtoken";
import configEnv from "../src/config/config";

config({ path: ".env.test" });

const { AppDataSource } = await import("../src/config/data-source");

export const testToken = jwt.sign(
  { id: 1, profile: "admin" },
  configEnv.jwtSecret,
  {
    expiresIn: "1h",
  },
);

export const memberToken = jwt.sign(
  { id: 2, profile: "member" },
  configEnv.jwtSecret,
  { expiresIn: "1h" },
);

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
