import { CreateAnswerDTO } from "../../../dto/answerDTO.js";
import { Answer } from "../../../entity/answerEntity.js";
import { AnswerRepository } from "../../../repository/answerRepository.js";
import { AnswerService } from "../answerService.js";
import { logger } from "../../../utils/logger/logger.js";
import { QuestionnaireRepository } from "../../../repository/questionnaireRepository.js";

export class AnswerServiceImpl implements AnswerService {
  private readonly answerRepository: typeof AnswerRepository;
  private readonly questionnaireRepository: typeof QuestionnaireRepository;

  constructor() {
    this.answerRepository = AnswerRepository;
    this.questionnaireRepository = QuestionnaireRepository;
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

  // TODO change to question
  async submitAnswers(
    questionnaireId: number,
    createAnswerDTO: CreateAnswerDTO,
  ): Promise<Answer> {
    const questionnaire = await this.questionnaireRepository.findOne({
      id: questionnaireId,
    });
    if (!questionnaire) {
      logger.warn({ questionnaireId }, "Invalid questionnaire ID.");
      throw new Error(`Questionnaire with id ${questionnaireId} not found.`);
    }

    const answer = this.answerRepository.create({
      ...createAnswerDTO,
      questionnaire,
    });

    return this.answerRepository.save(answer);
  }
}
