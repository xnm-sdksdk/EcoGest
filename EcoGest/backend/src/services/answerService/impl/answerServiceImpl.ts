import { CreateAnswerDTO } from "../../../dto/answerDTO.js";
import { Answer } from "../../../entity/answerEntity.js";
import { AnswerRepository } from "../../../repository/answerRepository.js";
import { AnswerService } from "../answerService.js";
import { logger } from "../../../utils/logger/logger.js";
import { QuestionRepository } from "../../../repository/questionRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { QuestionnaireRepository } from "../../../repository/questionnaireRepository.js";
import { QuestionResultDTO } from "../../../dto/questionDTO.js";

export class AnswerServiceImpl implements AnswerService {
  private readonly answerRepository: typeof AnswerRepository;
  private readonly questionRepository: typeof QuestionRepository;
  private readonly userRepository: typeof UserRepository;
  private readonly questionnaireRepository: typeof QuestionnaireRepository;

  constructor() {
    this.answerRepository = AnswerRepository;
    this.questionRepository = QuestionRepository;
    this.userRepository = UserRepository;
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
  ): Promise<QuestionResultDTO[]> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
    });

    if (!questionnaire) {
      logger.warn({ questionnaireId }, "No questionnaire found");
      throw new Error(`Questionnaire with id ${questionnaireId} not found.`);
    }

    const rows =
      await this.answerRepository.findQuestionnaireAnswerResults(
        questionnaireId,
      );

    const map = new Map<number, QuestionResultDTO>();
    for (const row of rows as any[]) {
      if (!map.has(row.questionId)) {
        map.set(row.questionId, {
          questionId: row.questionId,
          value: row.value,
          type: row.type,
          totalAnswers: 0,
          answers: [],
        });
      }
      const entry = map.get(row.questionId)!;
      if (row.value !== null) {
        entry.totalAnswers += Number(row.totalAnswers);
        entry.answers.push({
          value: row.value,
          count: Number(row.totalAnswers),
        });
      }
    }

    return Array.from(map.values());
  }

  async submitAnswers(
    questionnaireId: number,
    createAnswerDTO: CreateAnswerDTO,
  ): Promise<Answer> {
    const question = await this.questionRepository.findOne({
      where: {
        id: createAnswerDTO.questionId,
        questionnaire: { id: questionnaireId },
      },
      relations: ["questionnaire"],
    });
    if (!question) {
      logger.warn(
        { questionnaireId, questionId: createAnswerDTO.questionId },
        "Invalid question or questionnaire ID.",
      );
      throw new Error(
        `Question with id ${createAnswerDTO.questionId} not found in questionnaire ${questionnaireId}.`,
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: createAnswerDTO.createdBy },
    });
    if (!user) {
      logger.warn({ userId: createAnswerDTO.createdBy }, "Invalid user ID.");
      throw new Error(`User with id ${createAnswerDTO.createdBy} not found.`);
    }

    const answer = this.answerRepository.create({
      value: createAnswerDTO.value,
      question,
      createdBy: user,
    });

    return this.answerRepository.save(answer);
  }
}
