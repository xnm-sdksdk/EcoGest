import { AnswerDTO } from "../../dto/answerDTO.js";
import { Answer } from "../../entity/answerEntity.js";

export interface AnswerService {
  submitAnswers(
    questionnaireId: number,
    answerDTO: AnswerDTO,
  ): Promise<Answer[]>;

  findQuestionnaireAnswers(questionnaireId: number): Promise<Answer[]>;

  findQuestionnaireAnswerResults(questionnaireId: number): Promise<Answer[]>;
}
