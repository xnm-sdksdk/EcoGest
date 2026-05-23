import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null>(null);
  const token = ref<string | null>(null);

  function logout() {}

  return { user, token, logout };
});
