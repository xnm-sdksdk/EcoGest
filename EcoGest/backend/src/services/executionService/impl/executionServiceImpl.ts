import { ExecutionService } from "../executionService.js";
import { Execution } from "../../../entity/executionEntity.js";
import { ExecutionRepository } from "../../../repository/executionRepository.js";


export class ExecutionServiceImpl implements ExecutionService {
  private executionRepository: typeof ExecutionRepository;

  constructor() {
    this.executionRepository = ExecutionRepository;
  }


  async createExecution(execution: Execution): Promise<Execution> {
    return Promise.resolve(undefined);
  }

  async deleteExecutionById(executionId: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  async findExecutionByActivityId(executionId: number): Promise<Execution> {
    return Promise.resolve(undefined);
  }

  async updateExecutionById(execution: Execution): Promise<void> {
    return Promise.resolve(undefined);
  }


}