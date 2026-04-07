import { Router } from 'express';

const router = Router();

router.post('/api/admin/backup');
router.get('/api/admin/backup');
router.post('/api/admin/restore');

export default router;