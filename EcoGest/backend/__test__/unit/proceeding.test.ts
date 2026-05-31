import supertest from "supertest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";

import { describe, expect, it } from "vitest";

import { User, UserProfile } from "../../src/entity/userEntity";
import { Project } from "../../src/entity/projectEntity";
import { Meeting } from "../../src/entity/meetingEntity";
import { Proceedings } from "../../src/entity/proceedingsEntity";

async function createMeetingWithUser() {
  const userRepo = AppDataSource.getRepository(User);
  const projectRepo = AppDataSource.getRepository(Project);
  const meetingRepo = AppDataSource.getRepository(Meeting);

  const user = await userRepo.save(
    userRepo.create({
      name: "Test User",
      email: "test@test.com",
      password: "password",
      profile: UserProfile.MEMBER,
      active: true,
    }),
  );

  const project = await projectRepo.save(
    projectRepo.create({
      name: "Projeto Teste",
      school: "Escola Teste",
      schoolYear: "2025/2026",
      state: true,
    }),
  );

  const meeting = await meetingRepo.save(
    meetingRepo.create({
      date: new Date(),
      location: "Sala 1",
      workOrder: "Planeamento",
      createdBy: user,
      project,
    }),
  );

  return { user, project, meeting };
}

describe("GET /api/meetings/:id/proceedings", () => {
  it("should return 200 and proceedings", async () => {
    const { user, meeting } = await createMeetingWithUser();

    const repo = AppDataSource.getRepository(Proceedings);

    const proceeding = await repo.save(
      repo.create({
        content: "Ata da reunião",
        createdBy: user,
        meeting,
      }),
    );

    const response = await supertest(app)
      .get(`/api/meetings/${meeting.id}/proceedings`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(proceeding.id);
    expect(response.body.content).toBe("Ata da reunião");
  });

  it("should return 404 when proceedings do not exist", async () => {
    const response = await supertest(app)
      .get("/api/meetings/99999/proceedings")
      .send();

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid meeting id", async () => {
    const response = await supertest(app)
      .get("/api/meetings/abc/proceedings")
      .send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Meeting ID");
  });
});

describe("POST /api/meetings/:id/proceedings", () => {
  it("should create proceedings", async () => {
    const { user, meeting } = await createMeetingWithUser();

    const response = await supertest(app)
      .post(`/api/meetings/${meeting.id}/proceedings`)
      .send({
        content: "Ata criada por teste",
        createdBy: user.id,
      });

    expect(response.status).toBe(201);
    expect(response.body.content).toBe("Ata criada por teste");
  });

  it("should return 400 for invalid meeting id", async () => {
    const response = await supertest(app)
      .post("/api/meetings/abc/proceedings")
      .send({
        content: "Ata criada por teste",
        createdBy: 1,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Meeting ID");
  });

  it("should return 400 when content is missing", async () => {
    const { user, meeting } = await createMeetingWithUser();

    const response = await supertest(app)
      .post(`/api/meetings/${meeting.id}/proceedings`)
      .send({
        createdBy: user.id,
      });

    expect(response.status).toBe(400);
  });
});

describe("PUT /api/proceedings/:id", () => {
  it("should update proceedings", async () => {
    const { user, meeting } = await createMeetingWithUser();

    const repo = AppDataSource.getRepository(Proceedings);

    const proceeding = await repo.save(
      repo.create({
        content: "Ata original",
        createdBy: user,
        meeting,
      }),
    );

    const response = await supertest(app)
      .put(`/api/proceedings/${proceeding.id}`)
      .send({
        content: "Ata atualizada",
      });

    expect(response.status).toBe(200);
    expect(response.body.content).toBe("Ata atualizada");
  });

  it("should return 404 when proceedings do not exist", async () => {
    const response = await supertest(app)
      .put("/api/proceedings/99999")
      .send({
        content: "Ata atualizada",
      });

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid proceedings id", async () => {
    const response = await supertest(app)
      .put("/api/proceedings/abc")
      .send({
        content: "Ata atualizada",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Proceedings ID");
  });
});