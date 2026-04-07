import { Router } from 'express';

const router = Router();

router.post('/api/auth/login');
router.post('/api/auth/logout');
router.post('/api/auth/recover-password');
router.post('/api/auth/accept-invite');
router.put('/api/auth/reset-password');

export default router;
