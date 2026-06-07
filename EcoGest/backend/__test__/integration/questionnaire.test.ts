import supertest from "supertest";
import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";

import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import config from "../../src/config/config";

import { Questionnaire } from "../../src/entity/questionnaireEntity";
import { Project } from "../../src/entity/projectEntity";
import { User, UserProfile } from "../../src/entity/userEntity";

describe("GET /api/questionnaires/:id", () => {
  it("should return 200 and the questionnaire", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.save({
      name: "Test User",
      email: "questionnaire@test.com",
      password: "password",
      profile: UserProfile.MEMBER,
      active: true,
    });

    const projectRepo = AppDataSource.getRepository(Project);

    const project = await projectRepo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });

    const repo = AppDataSource.getRepository(Questionnaire);

    const questionnaire = await repo.save({
      title: "Questionário Teste",
      description: "Descrição teste",
      state: false,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .get(`/api/questionnaires/${questionnaire.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Questionário Teste");
  });

  it("should return 404 if questionnaire does not exist", async () => {
    const response = await supertest(app)
      .get("/api/questionnaires/99999")
      .send();

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid questionnaire id", async () => {
    const response = await supertest(app)
      .get("/api/questionnaires/abc")
      .send();

    expect(response.status).toBe(400);
  });
});

describe("PUT /api/questionnaires/:id/publish", () => {
  it("should publish a questionnaire", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.save({
      name: "Publish Admin",
      email: "publish@test.com",
      password: "password",
      profile: UserProfile.ADMIN,
      active: true,
    });

    const token = jwt.sign(
      {
        id: user.id,
        profile: user.profile,
      },
      config.jwtSecret,
    );

    const projectRepo = AppDataSource.getRepository(Project);

    const project = await projectRepo.save({
      name: "Project",
      school: "School",
      schoolYear: "2025/2026",
      state: true,
    });

    const repo = AppDataSource.getRepository(Questionnaire);

    const questionnaire = await repo.save({
      title: "Questionário",
      state: false,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .put(`/api/questionnaires/${questionnaire.id}/publish`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.state).toBe(true);
  });

  it("should return 404 when publishing non-existent questionnaire", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.save({
      name: "Publish Admin 404",
      email: "publish404@test.com",
      password: "password",
      profile: UserProfile.ADMIN,
      active: true,
    });

    const token = jwt.sign(
      {
        id: user.id,
        profile: user.profile,
      },
      config.jwtSecret,
    );

    const response = await supertest(app)
      .put("/api/questionnaires/99999/publish")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(404);
  });
});

describe("DELETE /api/questionnaires/:id", () => {
  it("should delete a questionnaire", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.save({
      name: "Delete Admin",
      email: "delete-questionnaire@test.com",
      password: "password",
      profile: UserProfile.ADMIN,
      active: true,
    });

    const token = jwt.sign(
      {
        id: user.id,
        profile: user.profile,
      },
      config.jwtSecret,
    );

    const projectRepo = AppDataSource.getRepository(Project);

    const project = await projectRepo.save({
      name: "Project",
      school: "School",
      schoolYear: "2025/2026",
      state: true,
    });

    const repo = AppDataSource.getRepository(Questionnaire);

    const questionnaire = await repo.save({
      title: "Questionário",
      state: false,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .delete(`/api/questionnaires/${questionnaire.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(204);

    const deleted = await repo.findOneBy({
      id: questionnaire.id,
    });

    expect(deleted).toBeNull();
  });
});