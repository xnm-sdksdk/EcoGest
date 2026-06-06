import supertest from "supertest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import { describe, expect, it } from "vitest";
import { Questionnaire } from "../../src/entity/questionnaireEntity";
import { Project } from "../../src/entity/projectEntity";
import { User, UserProfile } from "../../src/entity/userEntity";

describe("GET /api/questionnaires/:id", () => {
  it("should return 200 and the questionnaire for GET /api/questionnaires/:id", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "questionnaire@test.com",
        password: "hashed_password",
        profile: UserProfile.MEMBER,
        active: true,
      }),
    );

    const projectRepo = AppDataSource.getRepository(Project);
    const project = await projectRepo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });

    const repo = AppDataSource.getRepository(Questionnaire);
    const questionnaire = await repo.save(
      repo.create({
        title: "Questionário Teste",
        description: "Descrição teste",
        state: false,
        project,
        createdBy: user,
      }),
    );

    const response = await supertest(app)
      .get(`/api/questionnaires/${questionnaire.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", questionnaire.id);
    expect(response.body.title).toBe("Questionário Teste");
  });

  it("should return 404 for a non-existent questionnaire", async () => {
    const response = await supertest(app)
      .get("/api/questionnaires/99999")
      .send();

    expect(response.status).toBe(404);
  });
});