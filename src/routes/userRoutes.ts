import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { getUserProfile, updateUserProfile } from '../controllers/userController';

const router = Router();

router.use(requireAuth);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;
