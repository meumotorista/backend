import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Passenger creates a ride
export const requestRide = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { pickup_lat, pickup_lng, pickup_address, dropoff_lat, dropoff_lng, dropoff_address, price } = req.body;

    const { data, error } = await supabase
        .from('rides')
        .insert([{
            passenger_id: userId,
            pickup_lat,
            pickup_lng,
            pickup_address,
            dropoff_lat,
            dropoff_lng,
            dropoff_address,
            price,
            status: 'requested'
        }])
        .select()
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
};

// Driver sees available rides
export const getAvailableRides = async (req: Request, res: Response) => {
    // Ideally filter by location, but getting all requested rides for now
    const { data, error } = await supabase
        .from('rides')
        .select('*, passenger:profiles!passenger_id(full_name, rating)') // Assuming simple expansion works if relationships are set, otherwise remove passenger expansion
        .eq('status', 'requested');

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};

// Driver accepts a ride
export const acceptRide = async (req: Request, res: Response) => {
    const driverId = (req as any).user.id;
    const { id } = req.params;

    // First check if ride is still available
    const { data: ride, error: fetchError } = await supabase
        .from('rides')
        .select('status')
        .eq('id', id)
        .single();

    if (fetchError || !ride) {
        return res.status(404).json({ error: 'Ride not found' });
    }

    if (ride.status !== 'requested') {
        return res.status(400).json({ error: 'Ride no longer available' });
    }

    const { data, error } = await supabase
        .from('rides')
        .update({ driver_id: driverId, status: 'accepted' })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};

// Update ride status (pickup, complete, cancel)
export const updateRideStatus = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!['in_progress', 'completed', 'canceled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const { data, error } = await supabase
        .from('rides')
        .update({ status })
        .eq('id', id)
        .or(`driver_id.eq.${userId},passenger_id.eq.${userId}`) // Allow both to update status (logic can be refined)
        .select()
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};

export const getMyRides = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    // Get rides where user is passenger OR driver
    const { data, error } = await supabase
        .from('rides')
        .select('*')
        .or(`passenger_id.eq.${userId},driver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
}
