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
app.use('/rides', rideRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Meu Motorista API is running' });
});

// Root path
app.get('/', (req, res) => {
  res.json({ 
    message: 'Meu Motorista API',
    endpoints: {
      health: '/health',
      rides: '/rides',
      docs: '/api-docs'
    }
  });
});

export default app;

export const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    return app(req as any, res as any);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
