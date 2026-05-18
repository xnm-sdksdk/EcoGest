import { DashboardSummaryDTO } from 'src/types/dtos/dashboardDTO';
import api from 'src/services/apiService';

export const dashboardService = {
  findMetricsByProjectId: () =>
    api.get<DashboardSummaryDTO>('dashboard/summary').then((r) => r.data),
};
