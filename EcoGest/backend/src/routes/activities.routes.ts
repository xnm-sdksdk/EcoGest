import { Router } from 'express';

const router = Router();

router.get('/api/projects/:id/activities');
router.get('/api//activities/:id');

router.post('/api/projects/:id/activities');
router.put('/api//activities/:id');
router.delete('/api//activities/:id');

router.put('/api//activities/:id/approve');
router.put('/api//activities/:id/reject');



export default router;