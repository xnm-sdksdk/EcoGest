import { AppDataSource } from "../config/data-source.js";
import { Questionnaire } from "../entity/questionnaireEntity.js";

export const QuestionnaireRepository = AppDataSource.getRepository(Questionnaire).extend(
    {},
);
