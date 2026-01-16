import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rideRoutes from './routes/rideRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rides', rideRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Uber Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
