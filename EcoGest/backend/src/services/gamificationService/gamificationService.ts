import { RankingDTO, ScoringDTO } from "../../dto/scoringDTO.js";

export interface GamificationService {
  findScoringByProjectId(projectId: number): Promise<ScoringDTO[] | null>;

  findRankingByProjectId(projectId: number): Promise<RankingDTO[] | null>;
}
