import { Router } from 'express';
import * as rideController from '../controllers/rideController.js';

const router = Router();

/**
 * @swagger
 * /api/rides:
 *   post:
 *     summary: Solicitar uma nova corrida
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rider_id: { type: string, format: uuid }
 *               pickup_address: { type: string }
 *               pickup_latitude: { type: number }
 *               pickup_longitude: { type: number }
 *               destination_address: { type: string }
 *               destination_latitude: { type: number }
 *               destination_longitude: { type: number }
 *     responses:
 *       201:
 *         description: Corrida criada com sucesso
 */
router.post('/', rideController.createRide);

/**
 * @swagger
 * /api/rides/available:
 *   get:
 *     summary: Listar corridas aguardando motorista
 *     tags: [Rides]
 *     responses:
 *       200:
 *         description: Lista de corridas disponíveis
 */
router.get('/available', rideController.listAvailableRides);

/**
 * @swagger
 * /api/rides/{id}:
 *   get:
 *     summary: Obter detalhes de uma corrida específica
 *     tags: [Rides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Detalhes da corrida
 */
router.get('/:id', rideController.getRideStatus);

export default router;
