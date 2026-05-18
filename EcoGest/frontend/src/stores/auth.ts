import { defineStore } from '#q-app/wrappers';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null>(null);
  const token = ref<null>(null);

  function logout() {}

  return { user, token };
});
