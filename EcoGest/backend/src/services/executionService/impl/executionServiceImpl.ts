import { ExecutionService } from "../executionService.js";
import { Execution } from "../../../entity/executionEntity.js";
import { ExecutionRepository } from "../../../repository/executionRepository.js";
import { ActivityRepository } from "../../../repository/activityRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import {
  CreateExecutionDTO,
  UpdateExecutionDTO,
} from "../../../dto/executionDTO.js";
import { logger } from "../../../utils/logger/logger.js";

export class ExecutionServiceImpl implements ExecutionService {
  private readonly executionRepository: typeof ExecutionRepository;
  private readonly activityRepository: typeof ActivityRepository;
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.executionRepository = ExecutionRepository;
    this.activityRepository = ActivityRepository;
    this.userRepository = UserRepository;
  }

  async createExecution(
    activityId: number,
    executionDTO: CreateExecutionDTO,
  ): Promise<Execution> {
    const activity = await this.activityRepository.findOneBy({ id: activityId });

    if (!activity) {
      logger.warn({ activityId }, "Activity not found.");
      throw new Error(`Activity with id ${activityId} not found.`);
    }

    const existingExecution = await this.executionRepository.findOne({
      where: { activity: { id: activityId } },
    });

    if (existingExecution) {
      logger.warn({ activityId }, "Activity already has execution.");
      throw new Error(`Activity with id ${activityId} already has execution.`);
    }

    const createdBy = await this.userRepository.findOneBy({
      id: executionDTO.createdBy,
    });

    if (!createdBy) {
      logger.warn({ userId: executionDTO.createdBy }, "User not found.");
      throw new Error(`User with id ${executionDTO.createdBy} not found.`);
    }

    let executedBy = null;

    if (executionDTO.executedBy) {
      executedBy = await this.userRepository.findOneBy({
        id: executionDTO.executedBy,
      });

      if (!executedBy) {
        logger.warn({ userId: executionDTO.executedBy }, "Executed by user not found.");
        throw new Error(`User with id ${executionDTO.executedBy} not found.`);
      }
    }

    const execution = this.executionRepository.create({
      date: executionDTO.date,
      location: executionDTO.location ?? null,
      annotation: executionDTO.annotation ?? null,
      activity,
      createdBy,
      executedBy,
    });

    return await this.executionRepository.save(execution);
  }

  async findExecutionByActivityId(activityId: number): Promise<Execution | null> {
    if (!activityId || activityId <= 0) {
      logger.warn({ activityId }, "Invalid Activity ID.");
      throw new Error(`Invalid Activity ID: ${activityId}`);
    }

    return await this.executionRepository.findOne({
      where: { activity: { id: activityId } },
      relations: {
        activity: true,
        createdBy: true,
        executedBy: true,
        photos: true,
      },
    });
  }

  async updateExecutionById(
    executionId: number,
    executionDTO: UpdateExecutionDTO,
  ): Promise<Execution | null> {
    const execution = await this.executionRepository.findOne({
      where: { id: executionId },
      relations: {
        activity: true,
        createdBy: true,
        executedBy: true,
      },
    });

    if (!execution) {
      logger.warn({ executionId }, "Execution not found.");
      return null;
    }

    if (executionDTO.executedBy !== undefined) {
      if (executionDTO.executedBy === null) {
        execution.executedBy = null;
      } else {
        const executedBy = await this.userRepository.findOneBy({
          id: executionDTO.executedBy,
        });

        if (!executedBy) {
          logger.warn({ userId: executionDTO.executedBy }, "Executed by user not found.");
          throw new Error(`User with id ${executionDTO.executedBy} not found.`);
        }

        execution.executedBy = executedBy;
      }
    }

    execution.date = executionDTO.date ?? execution.date;
    execution.location = executionDTO.location ?? execution.location;
    execution.annotation = executionDTO.annotation ?? execution.annotation;

    return await this.executionRepository.save(execution);
  }

  async deleteExecutionById(executionId: number): Promise<void> {
    if (!executionId || executionId <= 0) {
      logger.warn({ executionId }, "Invalid Execution ID.");
      throw new Error("Execution ID not found.");
    }

    await this.executionRepository.delete(executionId);
  }
}