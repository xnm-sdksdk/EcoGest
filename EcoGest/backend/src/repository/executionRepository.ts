import { AppDataSource } from "../config/data-source.js";
import { Execution } from "../entity/executionEntity.js";

export const ExecutionRepository = AppDataSource.getRepository(
    Execution,
).extend({});
