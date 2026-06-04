import supertest from "supertest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import { describe, expect, it } from "vitest";
import { Project } from "../../src/entity/projectEntity";

describe("GET /api/projects", () => {
  it("should return 200 for GET /api/projects", async () => {
    const repo = AppDataSource.getRepository(Project);
    await repo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });
    const response = await supertest(app).get("/api/projects").send();
    console.log(response.body[0]);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toMatchObject({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });
  });

  it("should return an empty array if not project exists", async () => {
    const response = await supertest(app).get("/api/projects").send();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});
