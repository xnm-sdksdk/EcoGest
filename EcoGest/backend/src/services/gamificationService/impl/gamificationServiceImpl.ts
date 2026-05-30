import { GamificationService } from "../gamificationService.js";
import { RankingDTO, ScoringDTO } from "../../../dto/scoringDTO.js";
import { Scoring } from "../../../entity/scoringEntity.js";
import { GamificationRepository } from "../../../repository/gamificationRepository.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { logger } from "../../../utils/logger/logger.js";

export class GamificationServiceImpl implements GamificationService {
  private readonly gamificationRepository: typeof GamificationRepository;
  private readonly projectRepository: typeof ProjectRepository;

  constructor() {
    this.gamificationRepository = GamificationRepository;
    this.projectRepository = ProjectRepository;
  }

  async findRankingByProjectId(
    projectId: number,
    rankingDTO: RankingDTO,
  ): Promise<Scoring[] | null> {
    const projectExists = await this.projectRepository.findOneBy({
      id: projectId,
    });

    if (!projectExists) {
      logger.warn({ projectId }, "Project not found.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    return await this.gamificationRepository.find({});
  }

  async findScoringByProjectId(
    projectId: number,
    scoringDTO: ScoringDTO,
  ): Promise<Scoring[] | null> {
    return Promise.resolve(undefined);
  }
}
