import { AuthUserResponse } from 'src/types/dtos/authUserDTO';
import { api } from 'boot/axios';

export const authService = {
  login(email: string, password: string): Promise<AuthUserResponse> {
    return api.post<AuthUserResponse>('/auth/login', { email, password }).then((r) => r.data);
  },
};
