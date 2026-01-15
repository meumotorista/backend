export interface Admin {
    id: string;
    email: string;
    role: 'admin' | 'superadmin';
    created_at: string;
}

export interface Driver {
    id: string;
    name: string;
    email: string;
    license_plate: string;
    status: 'active' | 'inactive' | 'pending';
    created_at: string;
}

export interface Trip {
    id: string;
    driver_id: string;
    user_id: string;
    start_location: string;
    end_location: string;
    status: 'requested' | 'ongoing' | 'completed' | 'cancelled';
    price: number;
    created_at: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
