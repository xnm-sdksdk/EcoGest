import { Router } from "express";
import { ProjectMemberController } from "../controller/projectMembersController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const projectMemberController = new ProjectMemberController();

router.get(
  "/projects/:id/members",
  (req, res, next) => {
    /* #swagger.tags = ['Project Members']
       #swagger.summary = 'Listar membros de um projeto'
    */
    next();
  },
  projectMemberController.getProjectMembers,
);

router.post(
  "/projects/:id/members",
  (req, res, next) => {
    /* #swagger.tags = ['Project Members']
       #swagger.summary = 'Adicionar membro a um projeto'
       #swagger.parameters['obj'] = {
         in: 'body',
         schema: { $ref: '#/definitions/ProjectMemberRequest' }
       }
    */
    next();
  },
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
  ),
  projectMemberController.addProjectMember,
);

router.delete(
  "/projects/:id/members/:userId",
  (req, res, next) => {
    /* #swagger.tags = ['Project Members']
       #swagger.summary = 'Remover membro de um projeto'
    */
    next();
  },
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
  ),
  projectMemberController.removeProjectMember,
);

export default router;