import { Execution } from "../../entity/executionEntity.js";
import {
  CreateExecutionDTO,
  UpdateExecutionDTO,
} from "../../dto/executionDTO.js";

export interface ExecutionService {
  createExecution(
    activityId: number,
    executionDTO: CreateExecutionDTO,
  ): Promise<Execution>;

  deleteExecutionById(executionId: number): Promise<void>;

  updateExecutionById(
    executionId: number,
    executionDTO: UpdateExecutionDTO,
  ): Promise<Execution | null>;

  findExecutionByActivityId(activityId: number): Promise<Execution | null>;
}