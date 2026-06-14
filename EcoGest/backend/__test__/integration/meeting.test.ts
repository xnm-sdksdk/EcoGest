import supertest from "supertest";
import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";

import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import config from "../../src/config/config";

import { Meeting, MeetingState } from "../../src/entity/meetingEntity";
import { Project } from "../../src/entity/projectEntity";
import { User, UserProfile } from "../../src/entity/userEntity";

describe("GET /api/meetings/:id", () => {
  it("should return 200 and the meeting", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const meetingRepo = AppDataSource.getRepository(Meeting);

    const user = await userRepo.save({
      name: "Test User",
      email: "meeting@test.com",
      password: "password",
      profile: UserProfile.MEMBER,
      active: true,
    });

    const project = await projectRepo.save({
      name: "Test Project",
      school: "Test School",
      schoolYear: "2025/2026",
      state: true,
    });

    const meeting = await meetingRepo.save({
      title: "Reunião planeamento",
      date: new Date("2026-05-10"),
      location: "Sala 1",
      workOrder: "Planeamento",
      state: MeetingState.SCHEDULED,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .get(`/api/meetings/${meeting.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.location).toBe("Sala 1");
  });

  it("should return 404 if meeting does not exist", async () => {
    const response = await supertest(app).get("/api/meetings/99999").send();

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid id", async () => {
    const response = await supertest(app).get("/api/meetings/abc").send();

    expect(response.status).toBe(400);
  });
});

describe("PUT /api/meetings/:id/cancel", () => {
  it("should cancel a meeting", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const meetingRepo = AppDataSource.getRepository(Meeting);

    const user = await userRepo.save({
      name: "Admin User",
      email: "cancel@test.com",
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

    const project = await projectRepo.save({
      name: "Project",
      school: "School",
      schoolYear: "2025/2026",
      state: true,
    });

    const meeting = await meetingRepo.save({
      title: "Reunião planeamento",
      date: new Date(),
      location: "Sala",
      state: MeetingState.SCHEDULED,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .put(`/api/meetings/${meeting.id}/cancel`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.state).toBe(MeetingState.CANCELED);
  });

  it("should return 404 when cancelling non-existent meeting", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.save({
      name: "Admin User 404",
      email: "cancel404@test.com",
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
      .put("/api/meetings/99999/cancel")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(404);
  });
});

describe("DELETE /api/meetings/:id", () => {
  it("should delete a meeting", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const meetingRepo = AppDataSource.getRepository(Meeting);

    const user = await userRepo.save({
      name: "Delete Admin",
      email: "delete-meeting@test.com",
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

    const project = await projectRepo.save({
      name: "Project",
      school: "School",
      schoolYear: "2025/2026",
      state: true,
    });

    const meeting = await meetingRepo.save({
      title: "Reunião planeamento",
      date: new Date(),
      location: "Sala",
      state: MeetingState.SCHEDULED,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .delete(`/api/meetings/${meeting.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(204);

    const deletedMeeting = await meetingRepo.findOneBy({
      id: meeting.id,
    });

    expect(deletedMeeting).toBeNull();
  });
});

describe("POST /api/projects/:id/meetings", () => {
  it("should create a meeting and return 201", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);

    const user = await userRepo.save({
      name: "Test User",
      email: "create-meeting@test.com",
      password: "password",
      profile: UserProfile.ADMIN,
      active: true,
    });

    const token = jwt.sign(
      { id: user.id, profile: user.profile },
      config.jwtSecret,
    );

    const project = await projectRepo.save({
      name: "Projeto Teste",
      school: "Escola Teste",
      schoolYear: "2025/2026",
      state: true,
    });

    const response = await supertest(app)
      .post(`/api/projects/${project.id}/meetings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Reunião de Planeamento",
        date: "2026-05-10T14:30:00",
        location: "Sala 1",
        workOrder: "Planeamento",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.location).toBe("Sala 1");
  });

  it("should return 400 for missing required fields", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.save({
      name: "Test User 2",
      email: "create-meeting2@test.com",
      password: "password",
      profile: UserProfile.ADMIN,
      active: true,
    });

    const token = jwt.sign(
      { id: user.id, profile: user.profile },
      config.jwtSecret,
    );

    const response = await supertest(app)
      .post("/api/projects/1/meetings")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Só título" });

    expect(response.status).toBe(400);
  });
});

describe("GET /api/projects/:id/meetings", () => {
  it("should return 200 and list of meetings", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const meetingRepo = AppDataSource.getRepository(Meeting);

    const user = await userRepo.save({
      name: "Test User",
      email: "list-meetings@test.com",
      password: "password",
      profile: UserProfile.MEMBER,
      active: true,
    });

    const project = await projectRepo.save({
      name: "Projeto Teste",
      school: "Escola Teste",
      schoolYear: "2025/2026",
      state: true,
    });

    await meetingRepo.save({
      title: "Reunião Teste",
      date: new Date("2026-05-10"),
      location: "Sala 1",
      state: MeetingState.SCHEDULED,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .get(`/api/projects/${project.id}/meetings`)
      .send();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it("should return 404 for non-existent project", async () => {
    const response = await supertest(app)
      .get("/api/projects/99999/meetings")
      .send();

    expect(response.status).toBe(404);
  });
});

describe("PUT /api/meetings/:id", () => {
  it("should update a meeting and return 200", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const meetingRepo = AppDataSource.getRepository(Meeting);

    const user = await userRepo.save({
      name: "Test User",
      email: "update-meeting@test.com",
      password: "password",
      profile: UserProfile.ADMIN,
      active: true,
    });

    const token = jwt.sign(
      { id: user.id, profile: user.profile },
      config.jwtSecret,
    );

    const project = await projectRepo.save({
      name: "Projeto Teste",
      school: "Escola Teste",
      schoolYear: "2025/2026",
      state: true,
    });

    const meeting = await meetingRepo.save({
      title: "Reunião Original",
      date: new Date("2026-05-10"),
      location: "Sala 1",
      state: MeetingState.SCHEDULED,
      project,
      createdBy: user,
    });

    const response = await supertest(app)
      .put(`/api/meetings/${meeting.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Reunião Atualizada", location: "Auditório" });

    expect(response.status).toBe(200);
    expect(response.body.location).toBe("Auditório");
  });

  it("should return 404 for non-existent meeting", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.save({
      name: "Test User",
      email: "update-meeting404@test.com",
      password: "password",
      profile: UserProfile.ADMIN,
      active: true,
    });

    const token = jwt.sign(
      { id: user.id, profile: user.profile },
      config.jwtSecret,
    );

    const response = await supertest(app)
      .put("/api/meetings/99999")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Atualizado" });

    expect(response.status).toBe(404);
  });
});
