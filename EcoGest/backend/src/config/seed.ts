import "reflect-metadata";
import { config } from "dotenv";
import { AppDataSource } from "./data-source.js";
import { Project } from "../entity/projectEntity.js";
import { User, UserProfile } from "../entity/userEntity.js";
import { Activity, ActivityState } from "../entity/activityEntity.js";

const { default: bcrypt } = await import("bcrypt");

config();

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const projectRepo = AppDataSource.getRepository(Project);
  const activityRepo = AppDataSource.getRepository(Activity);

  const hashPwd = await bcrypt.hash("password123", 10);

  const admin = userRepo.create({
    name: "Admin",
    email: "admin@ecogest.pt",
    password: hashPwd,
    profile: UserProfile.ADMIN,
    active: true,
  });

  const coordinator = userRepo.create({
    name: "Coordenador",
    email: "coordinator@ecogest.pt",
    password: hashPwd,
    profile: UserProfile.COORDINATOR,
    active: true,
  });

  const member = userRepo.create({
    name: "Membro",
    email: "member@ecogest.pt",
    password: hashPwd,
    profile: UserProfile.MEMBER,
    active: true,
  });

  await userRepo.save([admin, coordinator, member]);

  const project = projectRepo.create({
    name: "Eco-Escolas ESMAD 2025/2026",
    school: "ESMAD",
    schoolYear: "2025/2026",
    state: true,
  });

  await projectRepo.save(project);

  const activity = activityRepo.create({
    name: "Plantação de Árvores Autóctones",
    description: "Atividade de reflorestação no recinto escolar.",
    area: "Biodiversidade",
    resources: ["Pás, regadores, 10 árvores"],
    startDate: new Date("2026-06-15"),
    endDate: new Date("2026-06-15"),
    state: ActivityState.PENDING,
    project: project,
    createdBy: admin.id,
  });

  await activityRepo.save(activity);

  console.log("Seed users, project e activities.");
  await AppDataSource.destroy();
}

await seed();
