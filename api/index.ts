import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

// Handler for Vercel serverless function
export default function handler(req: VercelRequest, res: VercelResponse) {
    return app(req, res);
}
