import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};

export const updateUserProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const updates = req.body;

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};
