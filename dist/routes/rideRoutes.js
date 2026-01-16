import { Router } from 'express';
import { RideController } from '../controllers/rideController.js';
const router = Router();
const rideController = new RideController();
router.post('/request', rideController.create);
router.post('/:rideId/accept', rideController.accept);
router.get('/:rideId', rideController.getStatus);
export default router;
