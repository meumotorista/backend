import request from 'supertest';
import express from 'express';
import cors from 'cors';
import rideRoutes from '../routes/rideRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/rides', rideRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Uber Backend is running' });
});

describe('GET /health', () => {
  it('should return 200 and ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      message: 'Uber Backend is running'
    });
  });
});
