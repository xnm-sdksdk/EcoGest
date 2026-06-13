import { ref } from 'vue';
import { UpdateUser, User } from 'src/types/dtos/userDTO';
import { userService } from 'src/services/userService';

export function useUser() {
  const data = ref<User | null>(null);
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchUserById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      data.value = await userService.getUserById(id);
    } catch (e) {
      error.value = 'Erro ao carregar as utilizadores';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchUsers() {
    loading.value = true;
    error.value = null;
    try {
      users.value = await userService.getUsers();
    } catch (e) {
      error.value = 'Erro ao carregar as utilizadores';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function updateUser(id: number, data: UpdateUser) {
    loading.value = true;
    error.value = null;
    try {
      await userService.updateUser(id, data);
    } catch (e) {
      error.value = 'Erro ao atualizar utilizador';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, fetchUserById, fetchUsers, users, updateUser };
}
