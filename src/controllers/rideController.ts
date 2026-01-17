import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const createRide = async (req: Request, res: Response) => {
  const { rider_id, pickup_address, pickup_latitude, pickup_longitude, destination_address, destination_latitude, destination_longitude } = req.body;

  const { data, error } = await supabase
    .from('rides')
    .insert([
      { 
        rider_id, 
        pickup_address, 
        pickup_latitude, 
        pickup_longitude, 
        destination_address, 
        destination_latitude, 
        destination_longitude,
        status: 'requested'
      }
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const getRideStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('rides')
    .select('*, profiles!rider_id(full_name), profiles!driver_id(full_name)')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'Corrida não encontrada' });
  res.json(data);
};

export const listAvailableRides = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('rides')
    .select('*')
    .eq('status', 'requested');

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
