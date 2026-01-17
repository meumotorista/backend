import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { getVehicles, addVehicle, updateVehicle } from '../controllers/driverController';

const router = Router();

router.use(requireAuth);

/**
 * @swagger
 * /api/drivers/vehicles:
 *   get:
 *     summary: Get driver's vehicles
 *     description: Retrieve all vehicles associated with the authenticated driver
 *     tags:
 *       - Drivers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved vehicles list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/vehicles', getVehicles);

/**
 * @swagger
 * /api/drivers/vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     description: Add a new vehicle to the driver's vehicle list
 *     tags:
 *       - Drivers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - make
 *               - model
 *               - plate
 *               - color
 *               - year
 *             properties:
 *               make:
 *                 type: string
 *                 description: Vehicle make/brand
 *               model:
 *                 type: string
 *                 description: Vehicle model
 *               plate:
 *                 type: string
 *                 description: Vehicle license plate
 *               color:
 *                 type: string
 *                 description: Vehicle color
 *               year:
 *                 type: integer
 *                 description: Year of manufacture
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
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
router.post('/vehicles', addVehicle);

/**
 * @swagger
 * /api/drivers/vehicles/{id}:
 *   put:
 *     summary: Update vehicle information
 *     description: Update details of an existing vehicle
 *     tags:
 *       - Drivers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               plate:
 *                 type: string
 *               color:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/vehicles/:id', updateVehicle);

export default router;
