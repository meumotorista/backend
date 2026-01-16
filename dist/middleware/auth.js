import { supabase } from '../config/supabase.js';
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // Attach user to request object
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
};
