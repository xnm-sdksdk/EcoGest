import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../src/main";
import { AppDataSource } from "../../src/config/data-source";
import { User, UserProfile } from "../../src/entity/userEntity";
import bcrypt from "bcrypt";

describe("POST /api/auth/login", () => {
  it("should return 200 and token for valid credentials", async () => {
    const userRepo = AppDataSource.getRepository(User);
    await userRepo.save(
      userRepo.create({
        name: "Admin",
        email: "admin@ecogest.pt",
        password: await bcrypt.hash("password123", 10),
        profile: UserProfile.ADMIN,
        active: true,
      }),
    );

    const response = await supertest(app)
      .post("/api/auth/login")
      .send({ email: "admin@ecogest.pt", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
  });

  it("should return 401 for invalid password", async () => {
    const response = await supertest(app)
      .post("/api/auth/login")
      .send({ email: "admin@ecogest.pt", password: "wrongpassword" });

    expect(response.status).toBe(401);
  });

  it("should return 400 for missing fields", async () => {
    const response = await supertest(app)
      .post("/api/auth/login")
      .send({ email: "admin@ecogest.pt" });

    expect(response.status).toBe(400);
  });
});
