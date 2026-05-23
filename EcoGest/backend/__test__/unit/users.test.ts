import supertest from "supertest";
import { app } from "../../src/main";
import { User, UserProfile } from "../../src/entity/userEntity";
import { AppDataSource } from "../../src/config/data-source";
import { describe, expect, it } from "vitest";

describe("GET /api/users", () => {
  it("should return 200 for GET /api/users", async () => {
    const repo = AppDataSource.getRepository(User);
    await repo.save(
      repo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.MEMBER,
        active: true,
      }),
    );
    const response = await supertest(app).get("/api/users").send();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toContainEqual(
      expect.objectContaining({ email: "test@example.com" }),
    );
  });
});

describe("GET /api/users/:id", () => {
  it("returns 404 and error if user does not exist", async () => {
    const response = await supertest(app).get("/api/users/1234567890").send();

    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe("User not found");
  });
});
