import supertest from "supertest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import { describe, expect, it } from "vitest";
import { Meeting, MeetingState } from "../../src/entity/meetingEntity";
import { Project } from "../../src/entity/projectEntity";
import { User, UserProfile } from "../../src/entity/userEntity";

describe("GET /api/meetings/:id", () => {
  it("should return 200 and the meeting for GET /api/meetings/:id", async () => {
    const userRepo = AppDataSource.getRepository(User);
    const projectRepo = AppDataSource.getRepository(Project);
    const meetingRepo = AppDataSource.getRepository(Meeting);

    const user = await userRepo.save({
      name: "Test User",
      email: "meeting@test.com",
      password: "hashed_password",
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
    expect(response.body).toHaveProperty("id", meeting.id);
    expect(response.body.location).toBe("Sala 1");
  });

  it("should return 400 for an invalid meeting id", async () => {
    const response = await supertest(app)
      .get("/api/meetings/abc")
      .send();

    expect(response.status).toBe(400);
  });
});