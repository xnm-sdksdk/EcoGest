import { Router } from "express";

const router = Router();

router.get("/levels");
router.get("/levels/:id");

router.post("/levels");
router.put("/levels/:id");

router.delete("/levels/:id");
router.get("/projects/:id/levels");
router.put("/projects/:id/levels");

export default router;
