import { api } from 'boot/axios';
import type { DashboardSummary } from 'src/types/dtos/dashboardDTO';

export const dashboardService = {
  findMetricsByProjectId: (projectId: number) =>
    api.get<DashboardSummary>(`/dashboard/${projectId}/summary`).then((r) => r.data),
};
