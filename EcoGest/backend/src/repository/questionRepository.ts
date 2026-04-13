import { AppDataSource } from "../config/data-source.js";
import { Question } from "../entity/questionEntity.js";

export const QuestionRepository = AppDataSource.getRepository(Question).extend(
    {},
);
