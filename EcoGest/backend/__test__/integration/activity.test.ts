import supertest from "supertest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import { describe, expect, it } from "vitest";
import { Activity, ActivityState } from "../../src/entity/activityEntity";
import { User, UserProfile } from "../../src/entity/userEntity";
import { testToken } from "../setup";
import { Project } from "../../src/entity/projectEntity";

describe("GET /api/activities/:id", () => {
  it("should return 200 and the activity for GET /api/activities/:id", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.MEMBER,
        active: true,
      }),
    );

    const repo = AppDataSource.getRepository(Activity);
    const activity = await repo.save(
      repo.create({
        name: "Plantação de milho",
        description: "Atividade de plantação.",
        area: "Biodiversidade",
        resources: ["Pás", "regadores", "luvas"],
        startDate: new Date("2026-05-15"),
        endDate: new Date("2026-05-15"),
        state: ActivityState.PENDING,
        createdBy: user,
      }),
    );

    const response = await supertest(app)
      .get(`/api/activities/${activity?.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", activity?.id);
    expect(response.body.name).toBe("Plantação de milho");
  });

  it("should return 404 for a non-existent activity", async () => {
    const response = await supertest(app).get("/api/activities/99999").send();

    expect(response.status).toBe(404);
  });
});

describe("GET /api/projects/:projectId/activities", () => {
  it("should return 200 and list of activities", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.MEMBER,
        active: true,
      }),
    );

    const projectRepo = AppDataSource.getRepository(Project);
    const project = await projectRepo.save(
      projectRepo.create({
        name: "Projeto Teste",
        school: "Escola Teste",
        schoolYear: "2025/2026",
        state: true,
      }),
    );

    const activityRepo = AppDataSource.getRepository(Activity);
    await activityRepo.save(
      activityRepo.create({
        name: "Plantação de milho",
        description: "Atividade de plantação.",
        area: "Biodiversidade",
        resources: ["Pás", "regadores", "luvas"],
        startDate: new Date("2026-05-15"),
        endDate: new Date("2026-05-15"),
        state: ActivityState.PENDING,
        createdBy: user,
        project: project,
      }),
    );

    const response = await supertest(app)
      .get(`/api/projects/${project.id}/activities`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Plantação de milho");
  });

  it("should return 404 for non-existent project", async () => {
    const response = await supertest(app)
      .get("/api/projects/99999/activities")
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(404);
  });
});

describe("POST /api/projects/:projectId/activities", () => {
  it("should create an activity", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.ADMIN,
        active: true,
      }),
    );

    const projectRepo = AppDataSource.getRepository(Project);
    const project = await projectRepo.save(
      projectRepo.create({
        name: "Projeto Teste",
        school: "Escola Teste",
        schoolYear: "2025/2026",
        state: true,
      }),
    );

    const response = await supertest(app)
      .post(`/api/projects/${project.id}/activities`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        name: "Plantação de milho",
        description: "Atividade de plantação.",
        area: "Biodiversidade",
        resources: ["Pás", "regadores", "luvas"],
        startDate: "2026-05-15",
        endDate: "2026-05-15",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Plantação de milho");
    expect(response.body.state).toBe("pending");
  });

  it("should return 404 for non-existent project", async () => {
    const response = await supertest(app)
      .post("/api/projects/9999/activities")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        name: "Plantação de milho",
        description: "Atividade de plantação.",
        area: "Biodiversidade",
        resources: ["Pás"],
        startDate: "2026-05-15",
        endDate: "2026-05-15",
      });

    expect(response.status).toBe(404);
  });

  it("should return 400 for missing fields", async () => {
    const response = await supertest(app)
      .post("/api/projects/1/activities")
      .set("Authorization", `Bearer ${testToken}`)
      .send({ name: "Sem campos" });

    expect(response.status).toBe(400);
  });
});

describe("DELETE /api/activities/:id", () => {
  it("should delete an activity and return 204", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.ADMIN,
        active: true,
      }),
    );

    const projectRepo = AppDataSource.getRepository(Project);
    const project = await projectRepo.save(
      projectRepo.create({
        name: "Projeto Teste",
        school: "Escola Teste",
        schoolYear: "2025/2026",
        state: true,
      }),
    );

    const activityRepo = AppDataSource.getRepository(Activity);
    const activity = await activityRepo.save(
      activityRepo.create({
        name: "Atividade Teste",
        description: "Descrição teste",
        area: "Biodiversidade",
        resources: ["Pás"],
        startDate: new Date("2026-05-15"),
        endDate: new Date("2026-05-15"),
        state: ActivityState.PENDING,
        createdBy: user,
        project: project,
      }),
    );

    const response = await supertest(app)
      .delete(`/api/activities/${activity.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send();

    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existent activity", async () => {
    const response = await supertest(app)
      .delete("/api/activities/99999")
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(404);
  });
});

describe("PUT /api/activities/:id/approve", () => {
  it("should update an activity and return 200", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.ADMIN,
        active: true,
      }),
    );

    const projectRepo = AppDataSource.getRepository(Project);
    const project = await projectRepo.save(
      projectRepo.create({
        name: "Projeto Teste",
        school: "Escola Teste",
        schoolYear: "2025/2026",
        state: true,
      }),
    );

    const activityRepo = AppDataSource.getRepository(Activity);
    const activity = await activityRepo.save(
      activityRepo.create({
        name: "Atividade Teste",
        description: "Descrição teste",
        area: "Biodiversidade",
        resources: ["Pás"],
        startDate: new Date("2026-05-15"),
        endDate: new Date("2026-05-15"),
        state: ActivityState.PENDING,
        createdBy: user,
        project: project,
      }),
    );

    const response = await supertest(app)
      .put(`/api/activities/${activity.id}/approve`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(response.body.state).toBe("approved");
  });
});

describe("PUT /api/activities/:id/complete", () => {
  it("should update an activity and return 200", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.ADMIN,
        active: true,
      }),
    );

    const projectRepo = AppDataSource.getRepository(Project);
    const project = await projectRepo.save(
      projectRepo.create({
        name: "Projeto Teste",
        school: "Escola Teste",
        schoolYear: "2025/2026",
        state: true,
      }),
    );

    const activityRepo = AppDataSource.getRepository(Activity);
    const activity = await activityRepo.save(
      activityRepo.create({
        name: "Atividade Teste",
        description: "Descrição teste",
        area: "Biodiversidade",
        resources: ["Pás"],
        startDate: new Date("2026-05-15"),
        endDate: new Date("2026-05-15"),
        state: ActivityState.COMPLETED,
        createdBy: user,
        project: project,
      }),
    );

    const response = await supertest(app)
      .put(`/api/activities/${activity.id}/complete`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(response.body.state).toBe("completed");
  });
});

describe("POST /api/activities/:id/participants", () => {
  it("should add a participant and return 201", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.ADMIN,
        active: true,
      }),
    );

    const projectRepo = AppDataSource.getRepository(Project);
    const project = await projectRepo.save(
      projectRepo.create({
        name: "Projeto Teste",
        school: "Escola Teste",
        schoolYear: "2025/2026",
        state: true,
      }),
    );

    const activityRepo = AppDataSource.getRepository(Activity);
    const activity = await activityRepo.save(
      activityRepo.create({
        name: "Atividade Teste",
        description: "Descrição teste",
        area: "Biodiversidade",
        resources: ["Pás"],
        startDate: new Date("2026-05-15"),
        endDate: new Date("2026-05-15"),
        state: ActivityState.PENDING,
        createdBy: user,
        project: project,
      }),
    );

    const response = await supertest(app)
      .post(`/api/activities/${activity.id}/participants`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ userId: user.id });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test User");
  });

  it("should return 400 for missing userId", async () => {
    const response = await supertest(app)
      .post("/api/activities/1/participants")
      .set("Authorization", `Bearer ${testToken}`)
      .send({});

    expect(response.status).toBe(400);
  });
});
