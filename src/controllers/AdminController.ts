import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';
import { ApiResponse } from '../types';

const adminService = new AdminService();

export class AdminController {
    async getAdmins(req: Request, res: Response<ApiResponse>) {
        try {
            const admins = await adminService.getAllAdmins();
            res.json({
                success: true,
                data: admins
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getAdmin(req: Request, res: Response<ApiResponse>) {
        try {
            const { id } = req.params;
            const admin = await adminService.getAdminById(id);

            if (!admin) {
                return res.status(404).json({
                    success: false,
                    error: 'Admin not found'
                });
            }

            res.json({
                success: true,
                data: admin
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}
