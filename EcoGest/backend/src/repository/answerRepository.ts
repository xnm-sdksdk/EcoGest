import { AppDataSource } from "../config/data-source.js";
import { Answer } from "../entity/answerEntity.js";

export const AnswerRepository = AppDataSource.getRepository(Answer).extend({});
