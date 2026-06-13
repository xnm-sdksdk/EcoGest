import { RankingDTO, ScoringDTO } from 'src/types/dtos/gamificationDTO';
import { api } from 'boot/axios';

export const gamificationService = {
  getScoringByProjectId(projectId: number): Promise<ScoringDTO[]> {
    return api.get(`/projects/${projectId}/scoring`).then((r) => r.data);
  },

  getRankingByProjectId(projectId: number): Promise<RankingDTO[]> {
    return api.get(`/projects/${projectId}/ranking`).then((r) => r.data);
  },
};
