import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { ApiResponse } from '../types';

export class DriverController {
    async getDrivers(req: Request, res: Response<ApiResponse>) {
        try {
            const { data, error } = await supabase.from('drivers').select('*');

            if (error) throw error;

            res.json({
                success: true,
                data: data
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}
