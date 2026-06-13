import { Activity, CreateActivity, UpdateActivity } from 'src/types/dtos/activityDTO';
import { api } from 'boot/axios';

export const activityService = {
  getActivityById(id: number): Promise<Activity> {
    return api.get<Activity>(`/activities/${id}`).then((r) => r.data);
  },

  getProjectByActivityId(projectId: number): Promise<Activity[]> {
    return api.get<Activity[]>(`/projects/${projectId}/activities`).then((r) => r.data);
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

  approveActivityState(id: number): Promise<Activity> {
    return api.put<Activity>(`/activities/${id}/approve`).then((r) => r.data);
  },

  rejectActivityState(id: number): Promise<Activity> {
    return api.put<Activity>(`/activities/${id}/reject`).then((r) => r.data);
  },

  completeActivityState(id: number): Promise<Activity> {
    return api.put<Activity>(`/activities/${id}/complete`).then((r) => r.data);
  },
};
