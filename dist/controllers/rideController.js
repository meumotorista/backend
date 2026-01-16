import { RideService } from '../services/rideService.js';
const rideService = new RideService();
export class RideController {
    async create(req, res) {
        try {
            const { riderId, pickup, destination, pickupAddress, destinationAddress } = req.body;
            const ride = await rideService.requestRide(riderId, pickup, destination, pickupAddress, destinationAddress);
            res.status(201).json(ride);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async accept(req, res) {
        try {
            const rideId = req.params.rideId;
            const { driverId } = req.body;
            const ride = await rideService.acceptRide(rideId, driverId);
            res.json(ride);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getStatus(req, res) {
        try {
            const rideId = req.params.rideId;
            const ride = await rideService.getRideById(rideId);
            res.json(ride);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
