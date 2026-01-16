import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../src/config/swagger.js';
import rideRoutes from '../src/routes/rideRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api/rides', rideRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Meu Motorista API is running' });
});

export default app;

export const api = async (req: VercelRequest, res: VercelResponse) => {
  try {
    app(req as any, res as any);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
