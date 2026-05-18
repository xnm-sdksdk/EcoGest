import api from 'src/services/apiService';
import { DashboardSummary } from 'src/types/dtos/dashboardDTO';

export const dashboardService = {
  findMetricsByProjectId: () => api.get<DashboardSummary>('dashboard/summary').then((r) => r.data),
};
