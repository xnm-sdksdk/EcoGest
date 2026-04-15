import { AppDataSource } from "../config/data-source.js";
import { Challenge } from "../entity/challengeEntity.js";

export const ChallengeRepository = AppDataSource.getRepository(Challenge).extend(
    {},
);
