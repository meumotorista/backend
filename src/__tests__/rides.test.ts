import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

// Mocking Supabase
jest.unstable_mockModule('../config/supabase.js', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn().mockImplementation(() => ({
      data: { id: '123', status: 'requested' },
      error: null
    })),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
  }
}));

// Import app components after mocking
const { default: rideRoutes } = await import('../routes/rideRoutes.js');

const app = express();
app.use(express.json());
app.use('/api/rides', rideRoutes);

describe('Ride Routes', () => {
  it('should request a new ride', async () => {
    const res = await request(app)
      .post('/api/rides/request')
      .send({
        riderId: 'user1',
        pickup: 'POINT(-46.6333 -23.5505)',
        destination: 'POINT(-46.6388 -23.5595)',
        pickupAddress: 'Rua A',
        destinationAddress: 'Rua B'
      });
    
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('requested');
  });

  it('should get ride status', async () => {
    const res = await request(app).get('/api/rides/123');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('123');
  });
});
