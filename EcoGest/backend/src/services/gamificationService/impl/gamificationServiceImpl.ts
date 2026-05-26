import { GamificationService } from "../gamificationService.js";
import { RankingDTO, ScoringDTO } from "../../../dto/scoringDTO.js";
import { Scoring } from "../../../entity/scoringEntity.js";

export class GamificationServiceImpl implements GamificationService {
  findRankingByProjectId(
    projectId: string,
    rankingDTO: RankingDTO,
  ): Promise<Scoring[] | null> {
    return Promise.resolve(undefined);
  }

  findScoringByProjectId(
    projectId: number,
    scoringDTO: ScoringDTO,
  ): Promise<Scoring[] | null> {
    return Promise.resolve(undefined);
  }
}
