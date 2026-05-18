import { Activity, CreateActivity, UpdateActivity } from 'src/types/dtos/activityDTO';
import api from 'src/services/apiService';

export const activityService = {
  getActivityById(id: number): Promise<Activity> {
    return api.get<Activity>(`/activities/${id}`).then((r) => r.data);
  },

  getProjectByActivityId(projectId: number): Promise<Activity> {
    return api.get<Activity>(`/projects/${projectId}/activities`).then((r) => r.data);
  },

  deleteActivityById(id: number): Promise<void> {
    return api.delete(`/activities/${id}`).then(() => undefined);
  },

  createActivity(projectId: number, activity: CreateActivity): Promise<Activity> {
    return api.post<Activity>(`/projects/${projectId}/activities`, activity).then((r) => r.data);
  },

  updateActivity(id: number, activity: UpdateActivity): Promise<Activity> {
    return api.put<Activity>(`/activities/${id}`, activity).then((r) => r.data);
  },

  approveActivityState(id: number, state: string): Promise<Activity> {
    return api.patch<Activity>(`/activities/${id}/approve`, state).then((r) => r.data);
  },

  rejectActivityState(id: number, state: string): Promise<Activity> {
    return api.patch<Activity>(`/activities/${id}/reject`, state).then((r) => r.data);
  },
};
