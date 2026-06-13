import { api } from 'boot/axios';
import { User } from 'src/types/dtos/userDTO';

export const activityParticipantsService = {
  getActivityParticipants(activityId: number): Promise<User[]> {
    return api.get<User[]>(`/activities/${activityId}/participants`).then((r) => r.data);
  },
  addActivityParticipant(activityId: number, userId: number): Promise<User> {
    return api.post<User>(`/activities/${activityId}/participants`, { userId }).then((r) => r.data);
  },
  removeActivityParticipant(activityId: number, userId: number): Promise<void> {
    return api.delete(`/activities/${activityId}/participants/${userId}`).then(() => undefined);
  },
};
