"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideService = void 0;
const supabase_1 = require("../config/supabase");
const types_1 = require("../types");
class RideService {
    async requestRide(riderId, pickup, destination, pickupAddr, destAddr) {
        const { data, error } = await supabase_1.supabase
            .from('rides')
            .insert([
            {
                rider_id: riderId,
                pickup_location: pickup, // Should be formatted for PostGIS
                destination_location: destination,
                pickup_address: pickupAddr,
                destination_address: destAddr,
                status: 'requested'
            }
        ])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async acceptRide(rideId, driverId) {
        const { data, error } = await supabase_1.supabase
            .from('rides')
            .update({
            driver_id: driverId,
            status: 'accepted',
            started_at: new Date().toISOString()
        })
            .eq('id', rideId)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async updateRideStatus(rideId, status) {
        const updateData = { status };
        if (status === 'completed') {
            updateData.completed_at = new Date().toISOString();
        }
        const { data, error } = await supabase_1.supabase
            .from('rides')
            .update(updateData)
            .eq('id', rideId)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async getRideById(rideId) {
        const { data, error } = await supabase_1.supabase
            .from('rides')
            .select('*, rider:profiles!rider_id(*), driver:profiles!driver_id(*)')
            .eq('id', rideId)
            .single();
        if (error)
            throw error;
        return data;
    }
}
exports.RideService = RideService;
//# sourceMappingURL=rideService.js.map