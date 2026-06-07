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
      localStorage.setItem('token', token.value!);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  function loadFromStorage() {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) token.value = storedToken;
    if (storedUser) user.value = JSON.parse(storedUser);
  }

  const isAuthenticated = () => !!token.value;

  return { user, token, login, logout, loadFromStorage, isAuthenticated };
});
