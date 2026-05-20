import { Router } from "express";
import { ExecutionController } from "../controller/executionController.js";

const router = Router();

const executionController = new ExecutionController();

router.get(
  "/activities/:id/execution",
  executionController.getExecutionByActivityId,
);

router.post(
  "/activities/:id/execution",
  executionController.createExecution,
);

router.put(
  "/executions/:id",
  executionController.updateExecutionById,
);

router.delete(
  "/executions/:id",
  executionController.deleteExecutionById,
);

export default router;