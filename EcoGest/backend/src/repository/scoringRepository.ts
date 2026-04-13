import { AppDataSource } from "../config/data-source.js";
import { Scoring } from "../entity/scoringEntity.js";

export const ScoringRepository = AppDataSource.getRepository(Scoring).extend(
    {},
);
