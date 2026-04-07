import { Router } from 'express';

const router = Router();

router.get('/api/projects/:id/challenges/:challengeId/progress/:userId');
router.put('/api/challenges/:id/progress');


export default router;