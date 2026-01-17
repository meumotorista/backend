import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { requestRide, getAvailableRides, acceptRide, updateRideStatus, getMyRides } from '../controllers/rideController';

const router = Router();

router.use(requireAuth);

/**
 * @swagger
 * /api/rides/request:
 *   post:
 *     summary: Request a new ride
 *     description: Create a new ride request as a passenger
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup_location
 *               - dropoff_location
 *               - pickup_lat
 *               - pickup_lng
 *               - dropoff_lat
 *               - dropoff_lng
 *             properties:
 *               pickup_location:
 *                 type: string
 *                 description: Pickup location address
 *               dropoff_location:
 *                 type: string
 *                 description: Dropoff location address
 *               pickup_lat:
 *                 type: number
 *                 format: float
 *                 description: Pickup latitude
 *               pickup_lng:
 *                 type: number
 *                 format: float
 *                 description: Pickup longitude
 *               dropoff_lat:
 *                 type: number
 *                 format: float
 *                 description: Dropoff latitude
 *               dropoff_lng:
 *                 type: number
 *                 format: float
 *                 description: Dropoff longitude
 *     responses:
 *       201:
 *         description: Ride request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/request', requestRide);

/**
 * @swagger
 * /api/rides/available:
 *   get:
 *     summary: Get available rides
 *     description: Retrieve all available rides for a driver to accept
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved available rides
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ride'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/available', getAvailableRides);

/**
 * @swagger
 * /api/rides/{id}/accept:
 *   post:
 *     summary: Accept a ride
 *     description: Accept a pending ride as a driver
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       404:
 *         description: Ride not found
 *       409:
 *         description: Ride already accepted or completed
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/accept', acceptRide);

/**
 * @swagger
 * /api/rides/{id}/status:
 *   patch:
 *     summary: Update ride status
 *     description: Update the status of an ongoing ride
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ride ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['in_progress', 'completed', 'cancelled']
 *                 description: New ride status
 *     responses:
 *       200:
 *         description: Ride status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id/status', updateRideStatus);

/**
 * @swagger
 * /api/rides/my-rides:
 *   get:
 *     summary: Get my rides
 *     description: Retrieve all rides for the authenticated user (passenger or driver)
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's rides
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ride'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/my-rides', getMyRides);

export default router;
