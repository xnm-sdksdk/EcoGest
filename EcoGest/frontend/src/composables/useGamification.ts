import { ref } from 'vue';
import { RankingDTO, ScoringDTO } from 'src/types/dtos/gamificationDTO';
import { gamificationService } from 'src/services/gamificationService';

export function useGamification() {
  const scoring = ref<ScoringDTO[]>([]);
  const ranking = ref<RankingDTO[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchScoringByProjectId(projectId: number) {
    loading.value = true;
    error.value = null;
    try {
      scoring.value = await gamificationService.getScoringByProjectId(projectId);
    } catch (e) {
      error.value = 'Erro ao carregar o scoring';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchRankingByProjectId(projectId: number) {
    loading.value = true;
    error.value = null;
    try {
      ranking.value = await gamificationService.getRankingByProjectId(projectId);
    } catch (e) {
      error.value = 'Erro ao carregar o ranking';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { scoring, ranking, loading, error, fetchScoringByProjectId, fetchRankingByProjectId };
}
