import { Request, Response } from 'express';
import { RideService } from '../services/rideService.js';

const rideService = new RideService();

export class RideController {
  async create(req: Request, res: Response) {
    try {
      const { riderId, pickup, destination, pickupAddress, destinationAddress } = req.body;
      const ride = await rideService.requestRide(riderId, pickup, destination, pickupAddress, destinationAddress);
      res.status(201).json(ride);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async accept(req: Request, res: Response) {
    try {
      const rideId = req.params.rideId as string;
      const { driverId } = req.body;
      const ride = await rideService.acceptRide(rideId, driverId);
      res.json(ride);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStatus(req: Request, res: Response) {
    try {
      const rideId = req.params.rideId as string;
      const ride = await rideService.getRideById(rideId);
      res.json(ride);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
