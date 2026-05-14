import { Question } from "../../entity/questionEntity.js";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../../dto/questionDTO.js";

export interface QuestionService {
  findQuestionByQuestionnaireId(questionnaireId: number): Promise<Question[]>;

  createQuestionByQuestionnaireId(
    questionnaireId: number,
    createQuestionDTO: CreateQuestionDTO,
  ): Promise<Question>;

  removeQuestionById(questionId: number): Promise<void | null>;

  updateQuestionById(
    questionId: number,
    updateQuestionDTO: UpdateQuestionDTO,
  ): Promise<Question | null>;
}
