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
    const response = await supertest(app)
      .get("/api/meetings/99999")
      .send();

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid id", async () => {
    const response = await supertest(app)
      .get("/api/meetings/abc")
      .send();

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

      console.log(response.status);
      console.log(response.body);

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