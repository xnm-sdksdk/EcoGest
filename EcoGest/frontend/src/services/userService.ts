import { User } from 'src/types/dtos/userDTO';
import { api } from 'boot/axios';

export const userService = {
  getUserById(id: number): Promise<User> {
    return api.get(`/users/${id}`).then((r) => r.data);
  },
};
