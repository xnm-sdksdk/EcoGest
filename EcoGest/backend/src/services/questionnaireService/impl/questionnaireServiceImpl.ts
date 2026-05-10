import { QuestionnaireService } from "../questionnaireService.js";
import { Questionnaire } from "../../../entity/questionnaireEntity.js";
import { QuestionnaireRepository } from "../../../repository/questionnaireRepository.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import {
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
} from "../../../dto/questionnaireDTO.js";
import { logger } from "../../../utils/logger/logger.js";

export class QuestionnaireServiceImpl implements QuestionnaireService {
  private readonly questionnaireRepository: typeof QuestionnaireRepository;
  private readonly projectRepository: typeof ProjectRepository;
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.questionnaireRepository = QuestionnaireRepository;
    this.projectRepository = ProjectRepository;
    this.userRepository = UserRepository;
  }

  async findQuestionnairesByProjectId(
    projectId: number,
  ): Promise<Questionnaire[]> {
    const projectExists = await this.projectRepository.existsBy({ id: projectId });

    if (!projectExists) {
      logger.warn({ projectId }, "Project not found.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    return await this.questionnaireRepository.find({
      where: { project: { id: projectId } },
      relations: {
        project: true,
        createdBy: true,
      },
    });
  }

  async findQuestionnaireById(
    questionnaireId: number,
  ): Promise<Questionnaire | null> {
    if (!questionnaireId || questionnaireId <= 0) {
      logger.warn({ questionnaireId }, "Invalid Questionnaire ID.");
      throw new Error(`Invalid Questionnaire ID: ${questionnaireId}`);
    }

    return await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
      relations: {
        project: true,
        createdBy: true,
        questions: true,
      },
    });
  }

  async createQuestionnaire(
    projectId: number,
    questionnaireDTO: CreateQuestionnaireDTO,
  ): Promise<Questionnaire> {
    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project) {
      logger.warn({ projectId }, "Project not found.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    const user = await this.userRepository.findOneBy({
      id: questionnaireDTO.createdBy,
    });

    if (!user) {
      logger.warn({ userId: questionnaireDTO.createdBy }, "User not found.");
      throw new Error(`User with id ${questionnaireDTO.createdBy} not found.`);
    }

    const questionnaire = this.questionnaireRepository.create({
      title: questionnaireDTO.title,
      description: questionnaireDTO.description ?? null,
      state: false,
      project,
      createdBy: user,
    });

    return await this.questionnaireRepository.save(questionnaire);
  }

  async updateQuestionnaireById(
    questionnaireId: number,
    questionnaireDTO: UpdateQuestionnaireDTO,
  ): Promise<Questionnaire | null> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
      relations: {
        project: true,
        createdBy: true,
      },
    });

    if (!questionnaire) {
      logger.warn({ questionnaireId }, "Questionnaire not found.");
      return null;
    }

    Object.assign(questionnaire, questionnaireDTO);
    return await this.questionnaireRepository.save(questionnaire);
  }

  async deleteQuestionnaireById(questionnaireId: number): Promise<void> {
    if (!questionnaireId || questionnaireId <= 0) {
      logger.warn({ questionnaireId }, "Invalid Questionnaire ID.");
      throw new Error("Questionnaire ID not found.");
    }

    await this.questionnaireRepository.delete(questionnaireId);
  }

  async publishQuestionnaireById(
    questionnaireId: number,
  ): Promise<Questionnaire | null> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
      relations: {
        project: true,
        createdBy: true,
      },
    });

    if (!questionnaire) {
      logger.warn({ questionnaireId }, "Questionnaire not found.");
      return null;
    }

    questionnaire.state = true;
    return await this.questionnaireRepository.save(questionnaire);
  }
}