import { CreateAnswerDTO } from "../../dto/answerDTO.js";
import { Answer } from "../../entity/answerEntity.js";
import { QuestionResultDTO } from "../../dto/questionDTO.js";

export interface AnswerService {
  submitAnswers(
    questionnaireId: number,
    createAnswerDTO: CreateAnswerDTO,
  ): Promise<Answer>;

  findQuestionnaireAnswers(questionnaireId: number): Promise<Answer[]>;

  findQuestionnaireAnswerResults(
    questionnaireId: number,
  ): Promise<QuestionResultDTO[]>;
}
