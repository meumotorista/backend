import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: "Trips routes working" });
});

export default router;
