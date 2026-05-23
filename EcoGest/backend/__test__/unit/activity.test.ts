import supertest from "supertest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import { describe, expect, it } from "vitest";
import { Activity, ActivityState } from "../../src/entity/activityEntity";
import { User, UserProfile } from "../../src/entity/userEntity";

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
        createdBy: user.id,
      }),
    );

    const response = await supertest(app)
      .get(`/api/activities/${activity.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", activity.id);
    expect(response.body.name).toBe("Plantação de milho");
  });

  it("should return 404 for a non-existent activity", async () => {
    const response = await supertest(app).get("/api/activities/99999").send();

    expect(response.status).toBe(404);
  });
});
