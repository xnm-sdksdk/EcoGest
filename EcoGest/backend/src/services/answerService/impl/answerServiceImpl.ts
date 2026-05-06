import { AnswerDTO } from "../../../dto/answerDTO.js";
import { Answer } from "../../../entity/answerEntity.js";
import { AnswerRepository } from "../../../repository/answerRepository.js";
import { AnswerService } from "../answerService.js";
import { logger } from "../../../utils/logger/logger.js";

export class AnswerServiceImpl implements AnswerService {
  private readonly answerRepository: typeof AnswerRepository;
  constructor() {
    this.answerRepository = AnswerRepository;
  }

  async findQuestionnaireAnswers(questionnaireId: number): Promise<Answer[]> {
    const answers = await this.answerRepository.find({
      where: {
        question: {
          questionnaire: { id: questionnaireId },
        },
      },
      relations: ["question", "createdBy"],
    });

    if (answers.length === 0) {
      logger.warn({ questionnaireId }, "No answers found for questionnaire.");
      throw new Error(`No answers found for questionnaire ${questionnaireId}.`);
    }

    return answers;
  }

  async findQuestionnaireAnswerResults(
    questionnaireId: number,
  ): Promise<Answer[]> {}

  async submitAnswers(
    questionnaireId: number,
    answerDTO: AnswerDTO,
  ): Promise<Answer[]> {}
}
