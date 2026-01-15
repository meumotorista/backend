import { Router } from 'express';
import { DriverController } from '../controllers/DriverController';

const router = Router();
const driverController = new DriverController();

router.get('/', driverController.getDrivers);

export default router;
