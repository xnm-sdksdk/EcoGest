import { AppDataSource } from "../config/data-source.js";
import { Scoring } from "../entity/scoringEntity.js";

export const GamificationRepository = AppDataSource.getRepository(
  Scoring,
).extend({});
