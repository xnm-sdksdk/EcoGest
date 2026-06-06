import { Router } from "express";
import { ProjectController } from "../controller/projectController.js";
import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authenticate.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const projectController = new ProjectController();

router.get(
  "/projects",
  (req, res, next) => {
    /* #swagger.tags = ['Projects']
     #swagger.summary = 'Listar projetos'
  */
    next();
  },
  projectController.getAllProjects,
);

router.get(
  "/projects/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Projects']
     #swagger.summary = 'Obter projeto por ID'
  */
    next();
  },
  projectController.getProjectById,
);

router.post(
  "/projects",
  (req, res, next) => {
    /* #swagger.tags = ['Projects']
     #swagger.summary = 'Criar projeto'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateProjectRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN),
  projectController.createProject,
);

router.put(
  "/projects/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Projects']
     #swagger.summary = 'Atualizar projeto'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateProjectRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN),
  projectController.updateProjectById,
);

router.delete(
  "/projects/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Projects']
     #swagger.summary = 'Eliminar projeto'
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN),
  projectController.deleteProjectById,
);

export default router;
