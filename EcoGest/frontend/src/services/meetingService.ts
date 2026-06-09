import { api } from 'boot/axios';
import { CreateMeeting, Meeting, UpdateMeeting } from 'src/types/dtos/meetingDTO';

export const meetingService = {
  getMeetingById(id: number): Promise<Meeting> {
    return api.get<Meeting>(`/meetings/${id}`).then((r) => r.data);
  },

  getMeetingByProjectId(projectId: number): Promise<Meeting> {
    return api.get<Meeting>(`/projects/${projectId}/meetings`).then((r) => r.data);
  },

  createMeeting(id: number, meeting: CreateMeeting): Promise<Meeting> {
    return api.post<Meeting>(`/projects/${id}/meetings`, meeting).then((r) => r.data);
  },

  deleteMeetingsById(id: number): Promise<void> {
    return api.delete(`/meetings/${id}`).then(() => undefined);
  },

  updateMeeting(id: number, meeting: UpdateMeeting): Promise<Meeting> {
    return api.put<Meeting>(`/meettings/${id}`, meeting).then((r) => r.data);
  },

  cancelMeeting(id: number, meeting: UpdateMeeting): Promise<Meeting> {
    return api.put<Meeting>(`/meettings/${id}/cancel`, meeting).then((r) => r.data);
  },
};
