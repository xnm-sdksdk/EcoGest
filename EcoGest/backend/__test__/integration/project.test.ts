import supertest from "supertest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import { describe, expect, it } from "vitest";
import { Project } from "../../src/entity/projectEntity";
import { testToken } from "../setup";
import { User, UserProfile } from "../../src/entity/userEntity";

describe("GET /api/projects", () => {
  it("should return 200 for GET /api/projects", async () => {
    const repo = AppDataSource.getRepository(Project);
    await repo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });
    const response = await supertest(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${testToken}`)
      .send();
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

describe("POST /api/projects", () => {
  it("should create a project", async () => {
    const userRepo = AppDataSource.getRepository(User);
    await userRepo.save(
      userRepo.create({
        name: "Admin",
        email: "admin@ecogest.pt",
        password: "hashed_password",
        profile: UserProfile.ADMIN,
        active: true,
      }),
    );

    const response = await supertest(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        name: "Compostagem Escolar",
        school: "Escola Secundária de Rodrigues de Freitas",
        schoolYear: "2025/2026",
        state: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Compostagem Escolar");
  });
});

describe("GET /api/projects/:id", () => {
  it("should return 200 for GET /api/projects/:id", async () => {
    const repo = AppDataSource.getRepository(Project);
    const project = await repo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });

    const response = await supertest(app)
      .get(`/api/projects/${project.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: project.id,
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });
  });

  it("should return 404 if project does not exist", async () => {
    const response = await supertest(app).get("/api/projects/999").send();

    expect(response.status).toBe(404);
  });
});

describe("DELETE /api/projects/:id", () => {
  it("should return 204 for DELETE /api/projects/:id", async () => {
    const repo = AppDataSource.getRepository(Project);
    const project = await repo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });

    const response = await supertest(app)
      .delete(`/api/projects/${project.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send();

    expect(response.status).toBe(204);

    const deleted = await repo.findOneBy({ id: project.id });
    expect(deleted).toBeNull();
  });

  it("should return 404 if project does not exist", async () => {
    const response = await supertest(app)
      .delete("/api/projects/999")
      .set("Authorization", `Bearer ${testToken}`)
      .send();

    expect(response.status).toBe(404);
  });
});

describe("PUT /api/projects/:id", () => {
  it("should return 200 and updated project", async () => {
    const repo = AppDataSource.getRepository(Project);
    const project = await repo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });

    const response = await supertest(app)
      .put(`/api/projects/${project.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        name: "Updated Project",
        school: "Updated School",
        schoolYear: "2026/2027",
        state: false,
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: project.id,
      name: "Updated Project",
      school: "Updated School",
      schoolYear: "2026/2027",
      state: false,
    });
  });

  it("should return 404 if project does not exist", async () => {
    const response = await supertest(app)
      .put("/api/projects/999")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        name: "Updated Project",
      });

    expect(response.status).toBe(404);
  });
});
