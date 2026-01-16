"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideController = void 0;
const express_1 = require("express");
const rideService_1 = require("../services/rideService");
const rideService = new rideService_1.RideService();
class RideController {
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
            const { rideId } = req.params;
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
            const { rideId } = req.params;
            const ride = await rideService.getRideById(rideId);
            res.json(ride);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
exports.RideController = RideController;
//# sourceMappingURL=rideController.js.map