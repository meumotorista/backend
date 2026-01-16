import { Router } from 'express';
import { RideController } from '../controllers/rideController.js';

const router = Router();
const rideController = new RideController();

/**
 * @swagger
 * /api/rides/request:
 *   post:
 *     summary: Solicitar uma nova corrida
 *     description: Cria uma nova solicitação de corrida com base nas coordenadas de pickup e destino
 *     tags:
 *       - Rides
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RideRequest'
 *           example:
 *             riderId: "550e8400-e29b-41d4-a716-446655440000"
 *             pickup:
 *               latitude: -23.5505
 *               longitude: -46.6333
 *             destination:
 *               latitude: -23.6155
 *               longitude: -46.7283
 *             pickupAddress: "Av. Paulista, 1000 - São Paulo, SP"
 *             destinationAddress: "Rua da Consolação, 500 - São Paulo, SP"
 *     responses:
 *       '201':
 *         description: Corrida solicitada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       '400':
 *         description: Erro na solicitação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/request', rideController.create);

/**
 * @swagger
 * /api/rides/{rideId}/accept:
 *   post:
 *     summary: Aceitar uma corrida
 *     description: Permite que um motorista aceite uma corrida solicitada
 *     tags:
 *       - Rides
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da corrida a aceitar
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RideAccept'
 *           example:
 *             driverId: "660e8400-e29b-41d4-a716-446655440111"
 *     responses:
 *       '200':
 *         description: Corrida aceita com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       '400':
 *         description: Erro ao aceitar corrida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:rideId/accept', rideController.accept);

/**
 * @swagger
 * /api/rides/{rideId}:
 *   get:
 *     summary: Obter status da corrida
 *     description: Recupera informações detalhadas e status de uma corrida específica
 *     tags:
 *       - Rides
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da corrida
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Detalhes da corrida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       '404':
 *         description: Corrida não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:rideId', rideController.getStatus);

export default router;
