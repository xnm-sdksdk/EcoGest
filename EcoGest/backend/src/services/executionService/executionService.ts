import { Execution } from "../../entity/executionEntity.js";
import { ExecutionDTO } from "../../dto/executionDTO.js";

export interface ExecutionService {
  createExecution(
    activityId: number,
    executionDTO: ExecutionDTO,
  ): Promise<Execution>;

  deleteExecutionById(executionId: number): Promise<void>;

  updateExecutionById(
    execution: Execution,
    executionDTO: ExecutionDTO,
  ): Promise<void>;

  findExecutionByActivityId(executionId: number): Promise<Execution | null>;
}
