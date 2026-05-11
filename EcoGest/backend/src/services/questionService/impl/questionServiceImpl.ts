import { QuestionRepository } from "../../../repository/questionRepository.js";
import { QuestionnaireRepository } from "../../../repository/questionnaireRepository.js";
import { QuestionService } from "../questionService.js";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../../../dto/questionDTO.js";
import { Question } from "../../../entity/questionEntity.js";
import { logger } from "../../../utils/logger/logger.js";

export class QuestionServiceImpl implements QuestionService {
  private readonly questionRepository: typeof QuestionRepository;
  private readonly questionnaireRepository: typeof QuestionnaireRepository;

  constructor() {
    this.questionRepository = QuestionRepository;
    this.questionnaireRepository = QuestionnaireRepository;
  }

  async createQuestionByQuestionnaireId(
    questionnaireId: number,
    createQuestionDTO: CreateQuestionDTO,
  ): Promise<Question> {
    const questionnaire = await this.questionnaireRepository.findOneBy({
      id: questionnaireId,
    });
    if (!questionnaire) {
      logger.warn({ questionnaireId }, "Invalid question ID.");
      throw new Error(`Questionnaire with id ${questionnaireId} not found.`);
    }

    const question = this.questionRepository.create({
      ...createQuestionDTO,
      questionnaire,
    });
    return this.questionRepository.save(question);
  }

  async findQuestionByQuestionnaireId(
    questionnaireId: number,
  ): Promise<Question[]> {
    const questionnaireExists = await this.questionnaireRepository.existsBy({
      id: questionnaireId,
    });

    if (!questionnaireExists) {
      logger.warn({ questionnaireId }, "Invalid questionnaire ID.");
      throw new Error(`Questionnaire with id ${questionnaireId} not found.`);
    }
    return this.questionRepository.find({
      where: { questionnaire: { id: questionnaireId } },
      relations: ["questionnaire", "createdBy"],
    });
  }

  async removeQuestionById(questionId: number): Promise<void | null> {
    return await this.questionRepository.delete(questionId).then(() => {});
  }

  async updateQuestionById(
    questionId: number,
    updateQuestionDTO: UpdateQuestionDTO,
  ): Promise<Question | null> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ["questionnaire", "createdBy"],
    });
    if (!question) {
      logger.warn({ questionId }, "Question not found.");
      return null;
    }

    Object.assign(question, updateQuestionDTO);
    return await this.questionRepository.save(question);
  }
}
