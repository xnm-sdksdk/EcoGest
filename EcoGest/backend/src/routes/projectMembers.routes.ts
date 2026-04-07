import { Router } from 'express';

const router = Router();

router.get('/api/projects/:id/members');
router.post('/api/projects/:id/members');
router.delete('/api/projects/:id/members/:userId');

export default router;