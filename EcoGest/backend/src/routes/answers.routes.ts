import { Router } from 'express';

const router = Router();

router.get('/api/questionnaires/:id/answers');
router.get('/api/questionnaires/:id/results');

export default router;