export type UserRole = 'rider' | 'driver' | 'admin';
export type VehicleType = 'UberX' | 'UberComfort' | 'UberBlack';
export type RideStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  rating: number;
  created_at: string;
}

export interface Vehicle {
  id: string;
  driver_id: string;
  make: string;
  model: string;
  license_plate: string;
  color: string;
  type: VehicleType;
}

export interface Ride {
  id: string;
  rider_id: string;
  driver_id?: string;
  pickup_location: any; // GeoJSON or Point
  destination_location: any;
  pickup_address: string;
  destination_address: string;
  status: RideStatus;
  fare: number;
  requested_at: string;
  started_at?: string;
  completed_at?: string;
}
