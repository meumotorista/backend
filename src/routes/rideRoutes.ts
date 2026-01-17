import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { requestRide, getAvailableRides, acceptRide, updateRideStatus, getMyRides } from '../controllers/rideController';

const router = Router();

router.use(requireAuth);

router.post('/request', requestRide);
router.get('/available', getAvailableRides);
router.post('/:id/accept', acceptRide);
router.patch('/:id/status', updateRideStatus);
router.get('/my-rides', getMyRides);

export default router;
