import { DashboardDTO } from "../../dto/dashbordDTO.js";

export interface DashboardService {
  findMetricsByProjectId(projectId: string): Promise<DashboardDTO>;

  findMonthlyMetricsByProjectId(projectId: string): Promise<DashboardDTO>;
}
