import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { getVehicles, addVehicle, updateVehicle } from '../controllers/driverController';

const router = Router();

router.use(requireAuth);

router.get('/vehicles', getVehicles);
router.post('/vehicles', addVehicle);
router.put('/vehicles/:id', updateVehicle);

export default router;
