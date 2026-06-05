import { AppDataSource } from "../config/data-source.js";
import { Answer } from "../entity/answerEntity.js";

export const AnswerRepository = AppDataSource.getRepository(Answer).extend({
  async findQuestionnaireAnswerResults(
    questionnaireId: number,
  ): Promise<Answer[]> {
    return this.query(
      `SELECT
         q.id AS "questionId",
         q.value AS "value",
         q.type AS "type",
         COUNT(a.id) AS "totalAnswers",
         a.value AS "value"
       FROM question q
              LEFT JOIN answer a ON a."questionId" = q.id
       WHERE q."questionnaireId" = $1
       GROUP BY q.id, q.value, q.type, a.value
       ORDER BY q.order ASC`,
      [questionnaireId],
    );
  },
});
