import { supabase } from '../config/supabase';
import { Ride, RideStatus } from '../types';

export class RideService {
  async requestRide(riderId: string, pickup: string, destination: string, pickupAddr: string, destAddr: string) {
    const { data, error } = await supabase
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

    if (error) throw error;
    return data;
  }

  async acceptRide(rideId: string, driverId: string) {
    const { data, error } = await supabase
      .from('rides')
      .update({ 
        driver_id: driverId, 
        status: 'accepted',
        started_at: new Date().toISOString()
      })
      .eq('id', rideId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRideStatus(rideId: string, status: RideStatus) {
    const updateData: any = { status };
    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('rides')
      .update(updateData)
      .eq('id', rideId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getRideById(rideId: string) {
    const { data, error } = await supabase
      .from('rides')
      .select('*, rider:profiles!rider_id(*), driver:profiles!driver_id(*)')
      .eq('id', rideId)
      .single();

    if (error) throw error;
    return data;
  }
}
