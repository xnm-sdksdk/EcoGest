import supertest from "supertest";
import {app} from "../../src/main";
import {User, UserProfile} from "../../src/entity/userEntity";
import {AppDataSource} from "../../src/config/data-source";
import {describe, expect, it} from "vitest";
import {testToken} from "../setup";

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
    const response = await supertest(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${testToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toContainEqual(
      expect.objectContaining({ email: "test@example.com" }),
    );
  });
});

describe("GET /api/users/:id", () => {
  it("returns 404 and error if user does not exist", async () => {
    const response = await supertest(app)
      .get("/api/users/1234567890")
      .set("Authorization", `Bearer ${testToken}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBe("User not found");
  });
});

describe("DELETE /api/users/:id", () => {
  it("should return 204 and delete the user", async () => {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.save(
      repo.create({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.MEMBER,
        active: true,
      }),
    );

    const response = await supertest(app)
      .delete(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send();

    expect(response.status).toBe(204);

    const deleted = await repo.findOneBy({ id: user.id });
    expect(deleted).toBeNull();
  });

  it("should return 404 when deleting a non-existent user", async () => {
    const response = await supertest(app)
      .delete("/api/users/99999")
      .set("Authorization", `Bearer ${testToken}`)
      .send();
    expect(response.status).toBe(204);
  });
});

describe("PUT /api/users/:id", () => {
  it("should return 403 and error if the objectId provided is invalid", async () => {
    const response = await supertest(app)
      .put("/api/users/iojidjcoi")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
        profile: UserProfile.MEMBER,
        active: true,
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Sem permissão");
  });
});
