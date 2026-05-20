import { Router } from "express";
import { LevelController } from "../controller/levelController.js";

const router = Router();

const levelController = new LevelController();

router.get("/levels", (req, res, next) => {
  /* #swagger.tags = ['Levels']
     #swagger.summary = 'Listar níveis'
  */
  next();
}, levelController.getAllLevels);

router.get("/levels/:id", (req, res, next) => {
  /* #swagger.tags = ['Levels']
     #swagger.summary = 'Obter nível por ID'
  */
  next();
}, levelController.getLevelById);

router.post("/levels", (req, res, next) => {
  /* #swagger.tags = ['Levels']
     #swagger.summary = 'Criar nível'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateLevelRequest' }
     }
  */
  next();
}, levelController.createLevel);

router.put("/levels/:id", (req, res, next) => {
  /* #swagger.tags = ['Levels']
     #swagger.summary = 'Atualizar nível'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateLevelRequest' }
     }
  */
  next();
}, levelController.updateLevelById);

router.delete("/levels/:id", (req, res, next) => {
  /* #swagger.tags = ['Levels']
     #swagger.summary = 'Eliminar nível'
  */
  next();
}, levelController.deleteLevelById);

router.get("/projects/:projectId/levels", (req, res, next) => {
  /* #swagger.tags = ['Levels']
     #swagger.summary = 'Obter nível de um projeto'
  */
  next();
}, levelController.getLevelByProjectId);

router.put("/projects/:projectId/levels", (req, res, next) => {
  /* #swagger.tags = ['Levels']
     #swagger.summary = 'Atualizar nível de um projeto'
  */
  next();
}, levelController.updateLevelByProjectId);

export default router;