import { AppDataSource } from "../config/data-source.js";
import { Project } from "../entity/projectEntity.js";

export const ProjectRepository = AppDataSource.getRepository(Project).extend(
    {},
);
