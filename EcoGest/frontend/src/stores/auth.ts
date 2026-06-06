import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AuthUser } from 'src/types/dtos/authUserDTO';
import { authService } from 'src/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const token = ref<string | null>(null);

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const response = await authService.login(email, password);
      token.value = response.token;
      user.value = response.user;
      localStorage.setItem('token', token.value);
      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('token');
    if (stored) {
      token.value = stored;
    }
  }

  const isAuthenticated = () => !!token.value;

  return { user, token, login, logout, loadFromStorage, isAuthenticated };
});
