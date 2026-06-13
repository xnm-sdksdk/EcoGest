import type {Request, Response} from "express";
import type {ExecutionService} from "../services/executionService/executionService.js";
import {ExecutionServiceImpl} from "../services/executionService/impl/executionServiceImpl.js";
import {CreateExecutionDTO, ExecutionDTO, UpdateExecutionDTO,} from "../dto/executionDTO.js";
import {logger} from "../utils/logger/logger.js";
import {AuthenticatedRequest} from "../dto/authDTO.js";

export class ExecutionController {
  private readonly executionService: ExecutionService;

  constructor() {
    this.executionService = new ExecutionServiceImpl();
  }

  getExecutionByActivityId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const activityId = Number(req.params.id);

      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const execution =
        await this.executionService.findExecutionByActivityId(activityId);

      if (!execution) {
        res.status(404).json({ error: "Execution not found" });
        return;
      }

      const executionDTO: ExecutionDTO = {
        id: execution.id,
        date: execution.date,
        location: execution.location,
        annotation: execution.annotation,
        activityId: execution.activity.id,
        createdBy: execution.createdBy.id,
        executedBy: execution.executedBy?.id ?? null,
        updatedAt: execution.updatedAt,
      };

      res.status(200).json(executionDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get execution by activity id");
      res.status(500).json({ error: error.message });
    }
  };

  createExecution = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      const activityId = Number(req.params.id);

      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const data: CreateExecutionDTO = req.body;

      if (!data.date) {
        res.status(400).json({
          error: "Missing required fields: date, createdBy",
        });
        return;
      }
      const createdBy = req.user!.id;

      const execution = await this.executionService.createExecution(
        activityId,
        data,
        createdBy,
      );

      const executionDTO: ExecutionDTO = {
        id: execution.id,
        date: execution.date,
        location: execution.location,
        annotation: execution.annotation,
        activityId: execution.activity.id,
        createdBy: execution.createdBy.id,
        executedBy: execution.executedBy?.id ?? null,
        updatedAt: execution.updatedAt,
      };

      logger.info({ executionId: execution.id }, "Execution created");
      res.status(201).json(executionDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create execution");
      res.status(500).json({ error: error.message });
    }
  };

  updateExecutionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const executionId = Number(req.params.id);

      if (Number.isNaN(executionId) || executionId <= 0) {
        res.status(400).json({ error: "Invalid Execution ID" });
        return;
      }

      const data: UpdateExecutionDTO = req.body;

      const updatedExecution = await this.executionService.updateExecutionById(
        executionId,
        data,
      );

      if (!updatedExecution) {
        res.status(404).json({ error: "Execution not found" });
        return;
      }

      const executionDTO: ExecutionDTO = {
        id: updatedExecution.id,
        date: updatedExecution.date,
        location: updatedExecution.location,
        annotation: updatedExecution.annotation,
        activityId: updatedExecution.activity.id,
        createdBy: updatedExecution.createdBy.id,
        executedBy: updatedExecution.executedBy?.id ?? null,
        updatedAt: updatedExecution.updatedAt,
      };

      logger.info({ executionId }, "Execution updated");
      res.status(200).json(executionDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to update execution");
      res.status(500).json({ error: error.message });
    }
  };

  deleteExecutionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const executionId = Number(req.params.id);

      if (Number.isNaN(executionId) || executionId <= 0) {
        res.status(400).json({ error: "Invalid Execution ID" });
        return;
      }

      await this.executionService.deleteExecutionById(executionId);

      logger.info({ executionId }, "Execution deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete execution");
      res.status(500).json({ error: error.message });
    }
  };
}
