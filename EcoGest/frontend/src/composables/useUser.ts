import { ref } from 'vue';
import { User } from 'src/types/dtos/userDTO';
import { userService } from 'src/services/userService';

export function useUser() {
  const data = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchUserById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      data.value = await userService.getUserById(id);
    } catch (e) {
      error.value = 'Erro ao carregar as atividades';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, fetchUserById };
}
