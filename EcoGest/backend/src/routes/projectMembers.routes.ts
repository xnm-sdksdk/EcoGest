import { Router } from "express";
import { ProjectMemberController } from "../controller/projectMembersController.js";

const router = Router();

const projectMemberController = new ProjectMemberController();

router.get(
  "/projects/:id/members",
  projectMemberController.getProjectMembers,
);

router.post(
  "/projects/:id/members",
  projectMemberController.addProjectMember,
);

router.delete(
  "/projects/:id/members/:userId",
  projectMemberController.removeProjectMember,
);

export default router;