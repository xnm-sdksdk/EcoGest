import { Router } from "express";
import { ProjectController } from "../controller/projectController.js";

const router = Router();

const projectController = new ProjectController();

router.get("/projects", (req, res, next) => {
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Listar projetos'
  */
  next();
}, projectController.getAllProjects);

router.get("/projects/:id", (req, res, next) => {
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Obter projeto por ID'
  */
  next();
}, projectController.getProjectById);

router.post("/projects", (req, res, next) => {
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Criar projeto'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateProjectRequest' }
     }
  */
  next();
}, projectController.createProject);

router.put("/projects/:id", (req, res, next) => {
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Atualizar projeto'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateProjectRequest' }
     }
  */
  next();
}, projectController.updateProjectById);

router.delete("/projects/:id", (req, res, next) => {
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Eliminar projeto'
  */
  next();
}, projectController.deleteProjectById);

export default router;