import { GamificationService } from "../gamificationService.js";
import { GamificationRepository } from "../../../repository/gamificationRepository.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { RankingDTO, ScoringDTO } from "../../../dto/scoringDTO.js";

export class GamificationServiceImpl implements GamificationService {
  private readonly gamificationRepository: typeof GamificationRepository;
  private readonly projectRepository: typeof ProjectRepository;

  constructor() {
    this.gamificationRepository = GamificationRepository;
    this.projectRepository = ProjectRepository;
  }
  async findRankingByProjectId(projectId: number): Promise<RankingDTO[]> {
    const projectExists = await this.projectRepository.findOneBy({
      id: projectId,
    });
    if (!projectExists)
      throw new Error(`Project with id ${projectId} not found.`);

    const rows = await this.gamificationRepository
      .createQueryBuilder("scoring")
      .select("user.id", "userId")
      .addSelect("user.name", "userName")
      .addSelect("SUM(scoring.points)", "totalPoints")
      .innerJoin("scoring.user", "user")
      .innerJoin("scoring.project", "project")
      .where("project.id = :projectId", { projectId })
      .groupBy("user.id")
      .addGroupBy("user.name")
      .orderBy("SUM(scoring.points)", "DESC")
      .getRawMany();

    return rows.map((row) => ({
      userId: row.userId,
      userName: row.userName,
      totalPoints: Number(row.totalPoints),
    }));
  }

  async findScoringByProjectId(projectId: number): Promise<ScoringDTO[]> {
    const projectExists = await this.projectRepository.findOneBy({
      id: projectId,
    });
    if (!projectExists)
      throw new Error(`Project with id ${projectId} not found.`);

    const results = await this.gamificationRepository.find({
      where: { project: { id: projectId } },
      relations: ["user", "challenge"],
      order: { createdAt: "DESC" },
    });

    return results.map((s) => ({
      id: s.id,
      points: s.points,
      reason: s.reason,
      userId: s.user.id,
      userName: s.user.name,
      challengeId: s.challenge?.id ?? null,
      createdAt: s.createdAt,
    }));
  }
}
