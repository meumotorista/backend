import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';

const router = Router();
const adminController = new AdminController();

router.get('/', adminController.getAdmins);
router.get('/:id', adminController.getAdmin);

export default router;
