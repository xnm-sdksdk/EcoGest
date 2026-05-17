import { DashboardService } from "../dashboardService.js";
import { DashboardDTO } from "../../../dto/dashbordDTO.js";

export class DashboardServiceImpl implements DashboardService {
  findMetricsByProjectId(projectId: string): Promise<DashboardDTO> {
    return Promise.resolve(undefined);
  }

  findMonthlyMetricsByProjectId(projectId: string): Promise<DashboardDTO> {
    return Promise.resolve(undefined);
  }
}
