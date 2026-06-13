import { CreateExecutionDTO, ExecutionDTO, UpdateExecutionDTO } from 'src/types/dtos/executionDTO';
import { api } from 'boot/axios';

export const executionService = {
  getExecutionByActivityId(activityId: number): Promise<ExecutionDTO> {
    return api.get<ExecutionDTO>(`/activities/${activityId}/execution`).then((r) => r.data);
  },
  createExecution(activityId: number, data: CreateExecutionDTO): Promise<ExecutionDTO> {
    return api.post<ExecutionDTO>(`/activities/${activityId}/execution`, data).then((r) => r.data);
  },
  updateExecution(executionId: number, data: UpdateExecutionDTO): Promise<ExecutionDTO> {
    return api.put<ExecutionDTO>(`/executions/${executionId}`, data).then((r) => r.data);
  },
  deleteExecution(executionId: number): Promise<void> {
    return api.delete(`/executions/${executionId}`).then(() => undefined);
  },
};
