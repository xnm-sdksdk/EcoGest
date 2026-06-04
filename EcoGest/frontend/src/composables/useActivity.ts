import { ref } from 'vue';
import { Activity } from 'src/types/dtos/activityDTO';
import { activityService } from 'src/services/activityService';

export function useActivity() {
  const data = ref<Activity[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchActivitiesByProjectId(projectId: number) {
    loading.value = true;
    error.value = null;
    try {
      data.value = await activityService.getProjectByActivityId(projectId);
    } catch (e) {
      error.value = 'Erro ao carregar as atividades';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, fetchActivitiesByProjectId };
}
