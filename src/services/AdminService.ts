import { supabase } from '../config/supabase';
import { Admin } from '../types';

export class AdminService {
    async getAllAdmins(): Promise<Admin[]> {
        const { data, error } = await supabase
            .from('admins')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        return data as Admin[];
    }

    async getAdminById(id: string): Promise<Admin | null> {
        const { data, error } = await supabase
            .from('admins')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            // Start handling specific errors if needed, e.g. not found
            return null;
        }

        return data as Admin;
    }
}
