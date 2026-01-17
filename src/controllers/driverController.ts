import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getVehicles = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('driver_id', userId);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};

export const addVehicle = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { model, plate, color, year } = req.body;

    const { data, error } = await supabase
        .from('vehicles')
        .insert([{ driver_id: userId, model, plate, color, year }])
        .select()
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};

export const updateVehicle = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
        .from('vehicles')
        .update(updates)
        .eq('id', id)
        .eq('driver_id', userId) // Ensure ownership
        .select()
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};
