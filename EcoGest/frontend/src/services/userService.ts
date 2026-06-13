import { UpdateUser, User } from 'src/types/dtos/userDTO';
import { api } from 'boot/axios';

export const userService = {
  getUserById(id: number): Promise<User> {
    return api.get(`/users/${id}`).then((r) => r.data);
  },
  getUsers(): Promise<User[]> {
    return api.get<User[]>('/users').then((r) => r.data);
  },
  updateUser(id: number, data: UpdateUser): Promise<User> {
    return api.put<User>(`/users/${id}`, data).then((r) => r.data);
  },
  deleteUser(id: number): Promise<void> {
    return api.delete(`/users/${id}`).then(() => undefined);
  },
};
