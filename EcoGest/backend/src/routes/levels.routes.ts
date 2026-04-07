import { Router } from 'express';

const router = Router();

router.get('/api/levels');
router.get('/api/levels/:id');

router.post('/api/levels');
router.put('/api/levels/:id');

router.delete('/api/levels/:id');
router.get('/api/projects/:id/levels');
router.put('/api/projects/:id/levels');


export default router;