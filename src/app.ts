import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import adminRoutes from './routes/admin.routes';
import driverRoutes from './routes/driver.routes';
import tripRoutes from './routes/trip.routes';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/admins', adminRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
