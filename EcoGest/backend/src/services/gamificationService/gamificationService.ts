import { Scoring } from "../../entity/scoringEntity.js";
import { RankingDTO, ScoringDTO } from "../../dto/scoringDTO.js";

export interface GamificationService {
  findScoringByProjectId(
    projectId: number,
    scoringDTO: ScoringDTO,
  ): Promise<Scoring[] | null>;

  findRankingByProjectId(
    projectId: number,
    rankingDTO: RankingDTO,
  ): Promise<Scoring[] | null>;
}
