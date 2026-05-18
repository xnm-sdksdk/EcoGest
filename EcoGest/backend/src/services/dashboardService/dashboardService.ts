import { DashboardDTO } from "../../dto/dashbordDTO.js";

export interface DashboardService {
  findMetricsByProjectId(projectId: number): Promise<DashboardDTO>;

  /*  findMonthlyMetricsByProjectId(projectId: number): Promise<DashboardDTO>;*/
}
