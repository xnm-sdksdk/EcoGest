import { Router } from "express";
import { ExecutionController } from "../controller/executionController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const executionController = new ExecutionController();

router.get(
  "/activities/:id/execution",
  (req, res, next) => {
    /* #swagger.tags = ['Execution']
     #swagger.summary = 'Obter execução de uma atividade'
  */
    next();
  },
  executionController.getExecutionByActivityId,
);

router.post(
  "/activities/:id/execution",
  (req, res, next) => {
    /* #swagger.tags = ['Execution']
     #swagger.summary = 'Criar execução para uma atividade'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateExecutionRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
    UserProfile.SECRETARIAT,
    UserProfile.MEMBER,
  ),
  executionController.createExecution,
);

router.put(
  "/executions/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Execution']
     #swagger.summary = 'Atualizar execução'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateExecutionRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
    UserProfile.SECRETARIAT,
    UserProfile.MEMBER,
  ),
  executionController.updateExecutionById,
);

router.delete(
  "/executions/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Execution']
     #swagger.summary = 'Eliminar execução'
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.COORDINATOR),
  executionController.deleteExecutionById,
);

export default router;
