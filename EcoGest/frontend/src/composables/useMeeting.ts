import { ref } from 'vue';
import { Meeting } from 'src/types/dtos/meetingDTO';
import { meetingService } from 'src/services/meetingService';

export function useMeeting() {
  const data = ref<Meeting[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchMeetingById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      const meeting = await meetingService.getMeetingById(id);
      data.value = [meeting];
    } catch (e) {
      error.value = 'Erro ao carregar reuniões';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, fetchMeetingById };
}
