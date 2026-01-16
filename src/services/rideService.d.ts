import { RideStatus } from '../types';
export declare class RideService {
    requestRide(riderId: string, pickup: string, destination: string, pickupAddr: string, destAddr: string): Promise<any>;
    acceptRide(rideId: string, driverId: string): Promise<any>;
    updateRideStatus(rideId: string, status: RideStatus): Promise<any>;
    getRideById(rideId: string): Promise<any>;
}
//# sourceMappingURL=rideService.d.ts.map