import { ref } from 'vue';
import { DashboardSummary } from 'src/types/dtos/dashboardDTO';
import { dashboardService } from 'src/services/dashboardService';

export function useDashboard() {
  const data = ref<DashboardSummary | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchDashboard(projectId: number) {
    loading.value = true;
    error.value = null;
    try {
      data.value = await dashboardService.findMetricsByProjectId(projectId);
    } catch (e) {
      error.value = 'Erro ao carregar o dashboard';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, fetchDashboard };
}
